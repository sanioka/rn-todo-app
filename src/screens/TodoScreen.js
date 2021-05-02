import React from 'react';

import { StyleSheet, Text, View, Button } from "react-native";

export const TodoScreen = ({goBack, todo}) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Back' onPress={goBack} color='#757575'/>
        </View>
        <View style={styles.button}>
          <Button title='Delete' color='#e53935' onPress={() => console.log('delete')} />
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

