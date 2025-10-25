import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import ProfileFormPage from './pages/ProfileFormPage'
import WeatherPage from './pages/WeatherPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="topbar-left">
          <button className="hamburger" onClick={() => setSidebarOpen((s) => !s)} aria-label="切换侧边栏">
            ☰
          </button>
          <Link to="/" className="brand">ReactTodo</Link>
        </div>

        <div className="topbar-right">
          <nav className="topnav">
            <Link to="/weather">天气</Link>
            <Link to="/profile">表单</Link>
            <Link to="/about">关于</Link>
            <Link to="/login">登录</Link>
          </nav>
        </div>
      </header>

      <div className={`layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <aside className="sidebar" aria-hidden={!sidebarOpen}>
          <ul>
            <li><Link to="/weather">天气</Link></li>
            <li><Link to="/profile">表单</Link></li>
            <li><Link to="/home">任务</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} aria-hidden />}

        <main className="main">
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/profile" element={<ProfileFormPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
