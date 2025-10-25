import React from 'react'
import { useTodoDispatch } from '../state/TodoContext'

export default function TodoItem({ todo }) {
  const dispatch = useTodoDispatch()
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => dispatch({ type: 'toggle', payload: todo.id })} />
        <span>{todo.text}</span>
      </label>
      <button className="remove" onClick={() => dispatch({ type: 'remove', payload: todo.id })}>
        ×
      </button>
    </li>
  )
}
