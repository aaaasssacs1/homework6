import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

export default function Home() {
  return (
    <div className="page home">
      <h1>任务管理</h1>
      <AddTodo />
      <TodoList />
    </div>
  )
}
