import React from 'react'

function conditionToEmoji(cond = '') {
  if (!cond) return '❔'
  if (cond.includes('晴')) return '☀️'
  if (cond.includes('多云') || cond.includes('云')) return '⛅'
  if (cond.includes('阴')) return '🌥️'
  if (cond.includes('雷')) return '⛈️'
  if (cond.includes('雨')) return '🌧️'
  if (cond.includes('雪')) return '❄️'
  if (cond.includes('雾') || cond.includes('霾')) return '🌫️'
  return '🌡️'
}

export default function Forecast({ items = [] }) {
  const styles = {
    container: { display: 'flex', gap: 10, alignItems: 'center', overflowX: 'auto' },
    card: { minWidth: 110, padding: 12, borderRadius: 12, background: '#fff', border: '1px solid #eef2ff', boxShadow: '0 6px 18px rgba(2,6,23,0.04)', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' },
    date: { fontSize: 13, color: '#475569' },
    emoji: { fontSize: 26 },
    temps: { fontSize: 13, color: '#0b1220' },
    small: { fontSize: 12, color: '#6b7280' },
  }

  if (!items || items.length === 0) return null

  return (
    <section aria-label="未来天气预报">
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>未来天气</div>
      <div style={styles.container}>
        {items.map((it, idx) => {
          const dateLabel = it.date || `第 ${idx + 1} 天`
          return (
            <div key={idx} style={styles.card}>
              <div style={styles.date}>{dateLabel}</div>
              <div style={styles.emoji} aria-hidden>{conditionToEmoji(it.condition)}</div>
              <div style={styles.small}>{it.condition || '—'}</div>
              <div style={styles.temps}>{it.high != null ? `${it.high}° /` : '— /'} {it.low != null ? `${it.low}°` : '—'}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
