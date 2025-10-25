import React, { useState } from 'react'

export default function Login({ onLogin = () => {}, onRegister = () => {} }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    // 简单校验
    if (!email.trim() || !password) return
    onLogin({ email: email.trim(), password })
  }

  function handleRegister(e) {
    e.preventDefault()
    if (!email.trim() || !password) return
    onRegister({ email: email.trim(), password })
  }

  // 内联样式（专业且简洁）
  const styles = {
    container: {
      maxWidth: 420,
      margin: '0 auto',
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      background: '#ffffff',
      fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    header: {
      marginBottom: 12,
      fontSize: 20,
      color: '#111827',
      fontWeight: 600,
    },
    formRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 12,
    },
    input: {
      padding: '10px 12px',
      borderRadius: 8,
      border: '1px solid #e5e7eb',
      fontSize: 14,
    },
    actions: {
      display: 'flex',
      gap: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    },
    primaryBtn: {
      background: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: 8,
      cursor: 'pointer',
      fontWeight: 600,
    },
    outlineBtn: {
      background: 'transparent',
      color: '#374151',
      border: '1px solid #d1d5db',
      padding: '9px 14px',
      borderRadius: 8,
      cursor: 'pointer',
    },
    hint: { fontSize: 13, color: '#6b7280' },
  }

  return (
    <div style={styles.container} role="region" aria-label="登录表单">
      <div style={styles.header}>欢迎回来</div>

      <form onSubmit={handleLogin}>
        <div style={styles.formRow}>
          <label style={{ fontSize: 13, color: '#374151' }}>邮箱</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div style={styles.formRow}>
          <label style={{ fontSize: 13, color: '#374151' }}>密码</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            required
          />
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.primaryBtn} aria-label="登录按钮">
            登录
          </button>

          <button type="button" style={styles.outlineBtn} onClick={handleRegister} aria-label="注册按钮">
            注册
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <span style={styles.hint}>忘记密码？请联系管理员重置。</span>
        </div>
      </form>
    </div>
  )
}
