import React, { useState } from 'react';

import { StyleSheet, Text, View, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";

export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
  const [isVisibleModal, setVisibleModal] = useState(false);

  const saveHandler = (title) => {
    onSave(todo.id, title);
    setVisibleModal(false);
  }

  return (
    <View>

      <EditModal
        isVisible={isVisibleModal}
        onCancel={() => setVisibleModal(false)}
        value={todo.title}
        onSave={saveHandler}
      />

      <AppCard style={styles.card} >
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='Edit' onPress={() => setVisibleModal(true)}/>
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

