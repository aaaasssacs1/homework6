import React from 'react'
import Login from '../components/Login'

export default function LoginPage() {
  function handleLogin(credentials) {
    console.log('登录回调：', credentials)
    // 这里可以调用 API，完成后重定向等
  }

  function handleRegister(credentials) {
    console.log('注册回调：', credentials)
  }

  return (
    <div style={{ padding: 24 }}>
      <Login onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  )
}
