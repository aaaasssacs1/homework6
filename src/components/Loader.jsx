import React from 'react'

export default function Loader({ size = 40, color = '#2563eb', text = '', inline = false }) {
  const stroke = Math.max(3, Math.round(size / 10))
  const styles = {
    container: {
      display: inline ? 'inline-flex' : 'flex',
      alignItems: 'center',
      gap: text ? 10 : 0,
    },
    svg: { width: size, height: size, transform: 'rotate(-90deg)' },
    text: { color: '#374151', fontSize: Math.max(12, Math.round(size / 6)) },
  }

  return (
    <div style={styles.container} role="status" aria-live="polite">
      <svg viewBox="0 0 36 36" style={styles.svg} aria-hidden>
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e6eefb"
          strokeWidth={stroke}
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
        >
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>

      {text ? <div style={styles.text}>{text}</div> : null}
    </div>
  )
}
