import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native';
import { THEME } from "../theme";
import { Entypo } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onPressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss(); // close keyboard
    } else {
      Alert.alert('Empty input');
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Input text here"
        autoCorrect={false}
        autoCapitalize='none'
      />
      <Entypo.Button name="add-to-list" size={24} color="white" title="Add" onPress={onPressHandler}>
        Add
      </Entypo.Button>
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
    width: '75%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
})