import React from 'react'
import ProfileForm from '../components/ProfileForm'

export default function ProfileFormPage() {
  function handleSubmit(data) {
    console.log('表单提交：', data)
    // 这里可以调用 API，或保存到 state
  }

  return (
    <div style={{ padding: 16 }}>
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  )
}
