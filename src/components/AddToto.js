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
        placeholder="Input todo here"
        placeholderTextColor={THEME.GRAY_COLOR}
        autoCorrect={false}
        autoCapitalize='none'
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={onPressHandler}
      />
      <Entypo.Button
        name="add-to-list"
        size={24}
        color="white"
        title="Add"
        backgroundColor={THEME.MAIN_COLOR}
        height={44}
        width={85}
        onPress={onPressHandler}>
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
    height: 44, // user interface guideline
  },
  input: {
    flex: 1,
    marginRight: 16,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: THEME.MAIN_COLOR,
  },
})