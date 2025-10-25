import React from 'react'

export default function WeatherCard({
  city = '未知城市',
  temperature = null,
  unit = '°C',
  condition = '未知',
  iconUrl = null,
  updatedAt = null,
  humidity = null,
  wind = null,
}) {
  // 更现代的卡片风格，使用内联样式保持组件可移植性
  const styles = {
    container: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '18px 20px',
      borderRadius: 14,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(247,249,255,0.9))',
      border: '1px solid rgba(15,23,42,0.06)',
      boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
      maxWidth: 520,
      width: '100%',
      fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    iconWrap: {
      width: 92,
      height: 92,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,#e0f2fe,#eef2ff)',
      flexShrink: 0,
    },
    icon: { width: 72, height: 72, objectFit: 'contain' },
    body: { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 },
    topRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
    city: { fontSize: 18, fontWeight: 700, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    tempBlock: { display: 'flex', alignItems: 'baseline', gap: 8 },
    temp: { fontSize: 34, fontWeight: 800, color: '#0ea5a4', lineHeight: 1 },
    unit: { fontSize: 14, color: '#475569' },
    condition: { fontSize: 14, color: '#374151', marginTop: 2 },
    metaRow: { display: 'flex', gap: 12, marginTop: 8, alignItems: 'center', color: '#6b7280', fontSize: 13 },
    pill: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 8px', borderRadius: 999, background: 'rgba(2,6,23,0.03)' },
    updated: { fontSize: 12, color: '#94a3b8' },
  }

  const tempDisplay = temperature === null || temperature === undefined ? '—' : temperature

  // 简单的占位 SVG（当没有 iconUrl 时）
  const PlaceholderIcon = (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="6" fill="#e6f6ff" />
      <path d="M7 11c1.333-2 3.333-2 4.667 0" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="9" r="2" fill="#ffd166" />
    </svg>
  )

  return (
    <section style={styles.container} aria-label={`天气：${city}`} role="region">
      <div style={styles.iconWrap} aria-hidden>
        {iconUrl ? <img src={iconUrl} alt={condition} style={styles.icon} /> : PlaceholderIcon}
      </div>

      <div style={styles.body}>
        <div style={styles.topRow}>
          <div style={styles.city} title={city}>{city}</div>

          <div style={styles.tempBlock} aria-live="polite">
            <div style={styles.temp}>{tempDisplay}</div>
            <div style={styles.unit}>{unit}</div>
          </div>
        </div>

        <div style={styles.condition}>{condition}</div>

        <div style={styles.metaRow}>
          {humidity !== null && humidity !== undefined && (
            <div style={styles.pill} title={`湿度 ${humidity}%`}>湿度 {humidity}%</div>
          )}

          {wind !== null && wind !== undefined && (
            <div style={styles.pill} title={`风速 ${wind}`}>风 {wind}</div>
          )}

          {updatedAt && <div style={styles.updated}>更新：{updatedAt}</div>}
        </div>
      </div>
    </section>
  )
}
