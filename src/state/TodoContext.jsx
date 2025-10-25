import React, { createContext, useContext, useReducer } from 'react'

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()

const initialState = {
  todos: [
    { id: 1, text: '示例任务：了解项目结构', completed: false },
  ],
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t)),
      }
    case 'remove':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export function useTodoState() {
  const context = useContext(TodoStateContext)
  if (context === undefined) throw new Error('useTodoState must be used within a TodoProvider')
  return context
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext)
  if (context === undefined) throw new Error('useTodoDispatch must be used within a TodoProvider')
  return context
}
