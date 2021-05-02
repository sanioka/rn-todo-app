import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

import { Navbar } from "./src/Navbar";
import { AddTodo } from "./src/AddToto";
import { Todo } from "./src/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    if (!title) {
      return;
    }

    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title,
    }]);
  }

  return (
    <View>
      <Navbar title="Todo App"/>
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo}/>

        <FlatList
          data={todos}
          renderItem={({item}) => <Todo todo={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
