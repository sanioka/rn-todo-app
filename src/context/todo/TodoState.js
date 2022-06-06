import React, { useReducer, useContext } from 'react';
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";
import { FIREBASE_URL, Http } from "../../http";

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
    clearError();
    try {
      const data = await Http.post(`${FIREBASE_URL}/todos.json`,{ title });
      dispatch({type: ADD_TODO, title, id: data.name});
    } catch(e) {
      showError(e);
    }
  }

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      // throw new Error('Error example 1 2 3');

      const data = await Http.get(`${FIREBASE_URL}/todos.json`) || [];

      if (data.error) {
        throw new Error(data.error);
      }

      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));

      dispatch({type: FETCH_TODOS, todos});
    } catch (e) {
      showError(`⚠️ Firebase fetch todos issue:\n${e}`);
    } finally {
      hideLoader();
    }
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
          onPress: async () => {
            changeScreen(null); // very strange workaround
            await Http.delete(`${FIREBASE_URL}/todos/${id}.json`);
            dispatch({type: REMOVE_TODO, id});
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }

  const updateTodo = async (id, title) => {
    clearError();

    try {
      await Http.patch(`${FIREBASE_URL}/todos/${id}.json`,{ title })
      dispatch({type: UPDATE_TODO, id, title})
    } catch(e) {
      showError(`Error edit data:\n${e}`);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({type: CLEAR_ERROR});

  return (
    <TodoContext.Provider
      value={{ // export
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}