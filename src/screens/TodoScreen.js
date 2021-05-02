import React from 'react';

import { StyleSheet, Text, View, Button } from "react-native";
import { THEME } from "../theme";

export const TodoScreen = ({goBack, todo}) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Back' onPress={goBack} color={THEME.GRAY_COLOR}/>
        </View>
        <View style={styles.button}>
          <Button title='Delete' color={THEME.DANGER_COLOR} onPress={() => console.log('delete')} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  }
})

