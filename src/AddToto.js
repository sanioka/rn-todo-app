import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export const AddTodo = ({ onSubmit }) => {

  const onPressHandler = () => {
    onSubmit('test todo');
  }

  return (
    <View style={styles.block}>
      <TextInput style={styles.input}/>
      <Button title="Add" onPress={onPressHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '80%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
})