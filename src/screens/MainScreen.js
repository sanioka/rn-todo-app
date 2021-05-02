import React from 'react';

import { StyleSheet, Text, View, FlatList } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddToto";

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo}/>

      <FlatList
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})