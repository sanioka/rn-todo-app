import React, { useReducer, useContext } from 'react';
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [
      {id: '1', title: 'Выучить React Native'},
      {id: '2', title: 'Нанести непоправимую пользу миру'},
      {id: '3', title: 'Попить кофе'},
    ],
  }
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = title => dispatch({type: ADD_TODO, title});

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