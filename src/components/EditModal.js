import React, { useState } from 'react';

import { StyleSheet, View, Modal, TextInput, Button, Alert } from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ isVisible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error', `Min length 3 symbols. Current is ${title.trim().length}`);
    } else {
      onSave(title);
    }
  }

  return (
    <Modal visible={isVisible} animationType='slide' transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <Button title='Cancel' onPress={onCancel} color={THEME.DANGER_COLOR}/>
          <Button title='Save' onPress={saveHandler}/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})