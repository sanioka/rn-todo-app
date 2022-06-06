import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, Text, ScrollView } from "react-native";

import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddToto";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

import { THEME } from "../theme";

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreenNavigation } = useContext(ScreenContext);

  /**
   * This case only to demonstrate how to use 'deviceWidth' and update it after device rotation
   */
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
  useEffect(() => {
    const changeHandler = () => {
      const newWidth = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(newWidth);
    }
    const eventListener = Dimensions.addEventListener('change', changeHandler);
    return () => {
      eventListener.remove();
    }; // onDestroy
  },[]);

  /**
   * useCallback to avoid redundant rendering and redundant adding of this method*
   * TODO: learn how it works (S06E55 course)
   */
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    // If 'todos' already loaded, avoid redundant firebase requests and spinner blinking between screen navigation
    if (todos.length === 0) {
      loadTodos();
    }
  }, []);

  if (loading) {
    return <AppLoader/>
  }

  if (error) {
    return <View style={styles.errorContainer}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Retry</AppButton>
    </View>
  }

  let content;

  // View when no any todos
  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Image style={styles.image} source={require('../../assets/no-items.png')}/>
          <Text style={styles.imageDescription}>No any todo...</Text>
        </ScrollView>
      </View>
    )
  } else {
    // View with some list of todos
    content = (
      <View style={{width: deviceWidth, height: '100%'}}>
        <FlatList
          data={todos}
          renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreenNavigation}/>}
          keyExtractor={item => item.id}
        />
      </View>
    )
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
    height: '100%',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  imageDescription: {
    color: 'gray',
    paddingTop: 15,
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