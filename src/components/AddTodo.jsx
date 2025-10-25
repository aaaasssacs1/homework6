import React, { useState } from 'react'
import { useTodoDispatch, useTodoState } from '../state/TodoContext'

export default function AddTodo() {
  const [text, setText] = useState('')
  const dispatch = useTodoDispatch()
  const { todos } = useTodoState()

  function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    dispatch({ type: 'add', payload: { id: nextId, text: text.trim(), completed: false } })
    setText('')
  }

  return (
    <form className="add-todo" onSubmit={handleAdd}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="添加新任务..." />
      <button type="submit">Add</button>
    </form>
  )
}
