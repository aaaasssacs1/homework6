import React, { useState, useEffect, useRef } from 'react'

export default function SearchBar({ onSearch = () => {}, placeholder = '搜索...', debounceMs = 300 }) {
  const [value, setValue] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    // 防抖逻辑
    if (debounceMs > 0) {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        onSearch(value)
      }, debounceMs)
      return () => clearTimeout(timerRef.current)
    } else {
      // 立即触发（无防抖）
      onSearch(value)
    }
  }, [value])

  function handleSubmit(e) {
    e.preventDefault()
    if (timerRef.current) clearTimeout(timerRef.current)
    onSearch(value)
  }

  const styles = {
    container: { display: 'flex', gap: 8, alignItems: 'center', maxWidth: 560, width: '100%' },
    input: {
      flex: 1,
      padding: '10px 12px',
      borderRadius: 8,
      border: '1px solid #e5e7eb',
      fontSize: 14,
    },
    button: {
      background: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '10px 14px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 600,
    },
  }

  return (
    <form style={styles.container} onSubmit={handleSubmit} role="search" aria-label="搜索">
      <input
        style={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" style={styles.button} aria-label="搜索按钮">
        搜索
      </button>
    </form>
  )
}
