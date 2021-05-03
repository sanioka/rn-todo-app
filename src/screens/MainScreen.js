import React, { useState, useEffect } from 'react';

import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddToto";
import { THEME } from "../theme";

export const MainScreen = ({todos, addTodo, removeTodo, openTodo}) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );

  // only for initialisation
  useEffect(() => {
    const changeHandler = () => {
      const newWidth = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(newWidth);
    }
    Dimensions.addEventListener('change', changeHandler);

    // onDestroy
    return () => {
      Dimensions.removeEventListener('change', changeHandler)
    };
  })

  let content = (
    <View style={{width: deviceWidth}}>
      <FlatList
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
        keyExtractor={item => item.id}
      />
    </View>
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