import React, { useState } from 'react'

export default function ProfileForm({ onSubmit = () => {} }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = '姓名为必填项'
    if (!phone.trim()) errs.phone = '手机号为必填项'
    else if (!/^\d{7,15}$/.test(phone.trim())) errs.phone = '请输入有效的手机号'
    if (!email.trim()) errs.email = '邮箱为必填项'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) errs.email = '请输入有效邮箱'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return
    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600)) // 模拟网络延迟
      onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() })
    } finally {
      setSubmitting(false)
    }
  }

  const styles = {
    container: {
      maxWidth: 560,
      margin: '24px auto',
      padding: 20,
      borderRadius: 10,
      background: '#fff',
      boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
      fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    },
    header: { fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#0f172a' },
    row: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 },
    label: { fontSize: 13, color: '#374151' },
    input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 },
    error: { color: '#dc2626', fontSize: 12, marginTop: 6 },
    actions: { display: 'flex', gap: 10, marginTop: 8 },
    submit: { background: '#0ea5a4', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 },
    reset: { background: 'transparent', border: '1px solid #e5e7eb', padding: '9px 12px', borderRadius: 8, cursor: 'pointer' },
  }

  return (
    <div style={styles.container} role="region" aria-label="个人信息表单">
      <div style={styles.header}>个人信息</div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.row}>
          <label style={styles.label}>姓名</label>
          <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="姓名" />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>

        <div style={styles.row}>
          <label style={styles.label}>手机号</label>
          <input style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="手机号（仅数字）" />
          {errors.phone && <div style={styles.error}>{errors.phone}</div>}
        </div>

        <div style={styles.row}>
          <label style={styles.label}>邮箱</label>
          <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.submit} disabled={submitting} aria-label="提交个人信息">
            {submitting ? '提交中...' : '提交'}
          </button>

          <button
            type="button"
            style={styles.reset}
            onClick={() => {
              setName('')
              setPhone('')
              setEmail('')
              setErrors({})
            }}
            aria-label="重置表单"
          >
            重置
          </button>
        </div>
      </form>
    </div>
  )
}
