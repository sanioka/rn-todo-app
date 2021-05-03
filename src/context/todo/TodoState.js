import React, { useReducer } from 'react';
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [
      {id: '1', title: 'Выучить React Native'},
    ],
  }
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos, // export todo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}