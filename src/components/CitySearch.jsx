import React, { useEffect, useState, useRef } from 'react'

// 简单的 CSV 解析并搜索匹配行，假设 CSV 第一列为省/市名，第二列为adcode等格式
// 具体解析逻辑根据文件实际列调整；这里实现一个通用的按包含匹配的策略
export default function CitySearch({ onSelectAdcode = () => {}, placeholder = '输入城市名搜索' }) {
  const [list, setList] = useState([])
  const [query, setQuery] = useState('')
  const [suggests, setSuggests] = useState([])
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    setLoading(true)
    fetch('/data/AMap_adcode_citycode.csv')
      .then((r) => r.text())
      .then((text) => {
        if (!mounted.current) return
        const rows = text.split(/\r?\n/).map((r) => r.trim()).filter(Boolean)
        const parsed = rows.map((r) => {
          // 简单分割，CSV 可能含引号，这里用基础分割处理常见格式
          const parts = r.split(',')
          // 假设最后一列为 adcode 或第二列
          const adcode = parts[parts.length - 2].trim()
          const name = parts[0].trim()
          return { name, adcode, raw: r }
        })
        setList(parsed)
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false))

    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!query) return setSuggests([])
    const q = query.toLowerCase()
    const matched = list.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 10)
    setSuggests(matched)
  }, [query, list])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}
      />

      {loading && <div style={{ color: '#6b7280' }}>正在加载城市列表...</div>}

      {suggests.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(2,6,23,0.06)', maxHeight: 220, overflow: 'auto' }}>
          {suggests.map((s) => (
            <div
              key={s.raw}
              onClick={() => {
                setQuery(s.name)
                setSuggests([])
                onSelectAdcode(s.adcode)
              }}
              style={{ padding: 8, borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
            >
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{s.adcode}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
