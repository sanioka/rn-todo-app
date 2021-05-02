import React from 'react';

import { StyleSheet, Text, View, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";

export const TodoScreen = ({goBack, todo, onRemove}) => {
  return (
    <View>
      <AppCard style={styles.card} >
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='Edit'/>
      </AppCard>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Back' onPress={goBack} color={THEME.GRAY_COLOR}/>
        </View>
        <View style={styles.button}>
          <Button title='Delete' color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)} />
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
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  }
})

