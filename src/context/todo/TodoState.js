import React, { useReducer, useContext } from 'react';
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [
      // {id: '1', title: 'Выучить React Native'},
      // {id: '2', title: 'Нанести непоправимую пользу миру'},
      // {id: '3', title: 'Попить кофе'},
    ],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    const responce = await fetch('https://rn-todo-app-1f784-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({title}),
    })
    const data = await responce.json();
    dispatch({type: ADD_TODO, title, id: data.name});
  }

  const removeTodo = id => {
    const todoItem = state.todos.find(item => item.id === id);

    Alert.alert(
      'Delete',
      `Are you sure to delete\n"${todoItem.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            changeScreen(null); // very strange workaround
            dispatch({type: REMOVE_TODO, id});
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }
  const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
      value={{ // export
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}