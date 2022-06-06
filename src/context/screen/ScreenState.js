import React, { useReducer } from 'react';
import { ScreenContext } from './screenContext';
import { screenReducer } from "./screenReducer";
import { CHANGE_SCREEN } from "../types";

export const ScreenState = ({ children }) => {
  // It's toggler between MainScreen (navigationTodoId === null) and TodoScreen (navigationTodoId !== null).
  const initialState = null;
  const [navigationTodoId, dispatch] = useReducer(screenReducer, initialState);

  const changeScreenNavigation = todoId => dispatch({type: CHANGE_SCREEN, navigationTodoId: todoId});

  return <ScreenContext.Provider value={{changeScreenNavigation, navigationTodoId}}>{children}</ScreenContext.Provider>
}
