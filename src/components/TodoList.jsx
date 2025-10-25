import React from 'react'
import { useTodoState } from '../state/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {
  const { todos } = useTodoState()
  if (!todos.length) return <p>暂无任务</p>
  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  )
}
