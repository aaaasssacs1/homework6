import React, { useState } from 'react'
import WeatherCard from '../components/WeatherCard'
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
        extensions: 'base',
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
        if (live) {
          setData({
            city: live.city || '未知',
            temperature: live.temperature != null ? live.temperature : null,
            unit: '°C',
            condition: live.weather || live.reporttime || '—',
            humidity: live.humidity,
            wind: live.windpower ? `${live.windpower} 级` : (live.winddirection || ''),
            updatedAt: live.reporttime,
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

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => fetchWeather('442000')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db' }}>
          获取默认城市天气（442000）
        </button>
      </div>

      {loading && <Loader size={48} text="获取天气中..." />}

      {error && <div style={{ color: '#dc2626' }}>{error}</div>}

      {data && !loading && <WeatherCard {...data} />}
    </div>
  )
}
