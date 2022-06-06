import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";

import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddToto";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    );

  // TODO: learn how it works (S06E55 course)
  // To avoid redundant rendering and redundant adding of this method*
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    loadTodos();
  }, [])

  useEffect(() => {
    const changeHandler = () => {
      const newWidth = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(newWidth);
    }
    const eventListener = Dimensions.addEventListener('change', changeHandler);

    // onDestroy
    return () => {
      eventListener.remove();
    };
  })

  if (loading) {
    return <AppLoader/>
  }

  if (error) {
    return <View style={styles.errorContainer}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Retry</AppButton>
    </View>
  }

  let content = (
    <View style={{width: deviceWidth, height: '100%'}}>
      <FlatList
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>}
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
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
  },
})