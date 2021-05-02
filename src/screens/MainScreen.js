import React from 'react';

import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddToto";

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}) => {
  let content = (
    <FlatList
      data={todos}
      renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
      keyExtractor={item => item.id}
    />
  )

  if (todos.length === 0) {
    content = <View style={styles.imageWrap}>
      <Image style={styles.image} source={require('../../assets/no-items.png')}/>
    </View>
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
})