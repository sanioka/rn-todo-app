import React, { useReducer } from 'react';
import { ScreenContext } from './screenContext';
import { screenReducer } from "./screenReducer";
import { CHANGE_SCREEN } from "../types";

export const ScreenState = ({ children }) => {
  // It's toggler between MainScreen (state === null) and TodoScreen (state === todoid).
  const initialState = null;
  const [state, dispatch] = useReducer(screenReducer, initialState);

  const changeScreen = id => dispatch({type: CHANGE_SCREEN, payload: id});

  return <ScreenContext.Provider value={{changeScreen, todoId: state}}>{children}</ScreenContext.Provider>
}
