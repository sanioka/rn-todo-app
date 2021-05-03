import React, { useState, useContext } from 'react';

import { Alert, StyleSheet, View } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = (props) => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  // const [todos, setTodos] = useState([
    // {id: '1', title: 'todo1'},
    // {id: '2', title: 'todo2'},
    // {id: '3', title: 'todo3'},
    // {id: '4', title: 'todo4'},
    // {id: '5', title: 'todo5'},
  // ]);
  const [todoId, setTodoID] = useState(null);

  // const addTodo = (title) => {
  //   if (!title) {
  //     return;
  //   }
  //
  //   setTodos(prev => [...prev, {
  //     id: Date.now().toString(),
  //     title,
  //   }]);
  // }

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

  // const updateTodo = (id, title) => {
  //   setTodos(prev => prev.map(todo => {
  //     if (todo.id === id) {
  //       todo.title = title;
  //     }
  //     return todo;
  //   }))
  // };

  let content = <MainScreen
    todos={todos}
    addTodo={addTodo}
    removeTodo={removeTodo}
    openTodo={id => setTodoID(id)}
  />;

  if (todoId) {
    // const selectedTodo = ;
    content = <TodoScreen
      onRemove={removeTodo}
      goBack={() => { setTodoID(null) }}
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