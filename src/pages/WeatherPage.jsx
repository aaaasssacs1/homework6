import React, { useState } from 'react'
import WeatherCard from '../components/WeatherCard'
import Forecast from '../components/Forecast'
import LifeAdvice from '../components/LifeAdvice'
import Loader from '../components/Loader'
import { AMAP_KEY } from '../config'
import CitySearch from '../components/CitySearch'

export default function WeatherPage({ amapKey }) {
  const key = AMAP_KEY || amapKey
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function fetchWeather(city = '442000') {
    setError(null)
    if (!key || key === 'YOUR_AMAP_KEY_HERE') {
      setError('请在 src/config.js 中配置有效的高德 Key')
      return
    }

    setLoading(true)
    try {
      const params = new URLSearchParams({
        key,
        city,
        // 请求预报需要 all 扩展
        extensions: 'all',
        output: 'JSON',
      })
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?${params.toString()}`
      const res = await fetch(url)
      const json = await res.json()

      if (json.status !== '1') {
        setError(json.info || '获取天气失败')
        setData(null)
      } else {
        // 高德 base 返回 live 数组
        const live = (json.lives && json.lives[0]) || null
        // forecasts -> forecasts[0].casts 是逐日预报数组
        const rawForecasts = (json.forecasts && json.forecasts[0] && json.forecasts[0].casts) || []
        const forecasts = rawForecasts.map((c) => ({
          // AMap casts 通常包含 date, dayweather, nightweather, daytemp, nighttemp
          date: c.date || c.day || '',
          condition: c.dayweather || c.day || c.dayweather || '—',
          high: c.daytemp != null ? c.daytemp : (c.dayTemp || null),
          low: c.nighttemp != null ? c.nighttemp : (c.nightTemp || null),
        }))
        if (live) {
          setData({
            city: live.city || '未知',
            temperature: live.temperature != null ? live.temperature : null,
            unit: '°C',
            condition: live.weather || live.reporttime || '—',
            humidity: live.humidity,
            wind: live.windpower ? `${live.windpower} 级` : (live.winddirection || ''),
            updatedAt: live.reporttime,
            // add parsed forecast array (may be empty)
            forecast: forecasts,
          })
        } else if (forecasts && forecasts.length > 0) {
          // 没有实况，但有逐日预报：仍展示预报和生活建议，实况字段留空
          const cityName = (json.forecasts && json.forecasts[0] && json.forecasts[0].city) || '未知'
          setData({
            city: cityName,
            temperature: null,
            unit: '°C',
            condition: forecasts[0] && forecasts[0].condition ? forecasts[0].condition : '—',
            humidity: null,
            wind: null,
            updatedAt: null,
            forecast: forecasts,
          })
        } else {
          setError('无实况数据')
          setData(null)
        }
      }
    } catch (err) {
      setError(err.message || '请求异常')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 18 }}>
      <div style={{ marginBottom: 12 }}>
        <CitySearch onSelectAdcode={(adcode) => fetchWeather(adcode)} />
      </div>

      {loading && <Loader size={48} text="获取天气中..." />}

      {error && <div style={{ color: '#dc2626' }}>{error}</div>}

      {data && !loading && (
        <>
          <WeatherCard {...data} />

          {/* 未来预报：显示 3-5 天（如果有） */}
          {data.forecast && data.forecast.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <Forecast items={data.forecast.slice(0, 5)} />
            </div>
          )}

          {/* 生活建议模块 */}
          <div style={{ marginTop: 12 }}>
            <LifeAdvice temperature={Number(data.temperature)} humidity={Number(data.humidity)} condition={data.condition} />
          </div>
        </>
      )}
    </div>
  )
}
