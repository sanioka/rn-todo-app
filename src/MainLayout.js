import React, { useState, useContext } from 'react';

import { Alert, StyleSheet, View } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = (props) => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  // const removeTodo = id => {
  //   const todoItem = todos.find(item => item.id === id)
  //
  //   Alert.alert(
  //     'Delete todo',
  //     `Are you sure to delete\n${todoItem.title}?`,
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Delete", onPress: () => {
  //           setTodoID(null);
  //           setTodos(prev => prev.filter(todo => todo.id !== id))
  //         }
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // }

  let content = <MainScreen
    todos={todos}
    addTodo={addTodo}
    removeTodo={removeTodo}
    openTodo={id => changeScreen(id)}
  />;

  if (todoId) {
    content = <TodoScreen
      onRemove={removeTodo}
      goBack={() => { changeScreen(null) }}
      onSave={updateTodo}
      todo={todos.find(todoItem => todoItem.id === todoId)}
    />
  }

  return (
    <View>
      <Navbar title="Todo App"/>
      <View style={styles.container}>
        { content }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
