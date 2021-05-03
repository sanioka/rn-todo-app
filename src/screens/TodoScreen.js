import React, { useContext, useState } from 'react';

import { StyleSheet, View, Button, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";

export const TodoScreen = () => {

  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find(item => item.id === todoId);

  const [isVisibleModal, setVisibleModal] = useState(false);

  const saveHandler = (title) => {
    updateTodo(todo.id, title);
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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setVisibleModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <AppButton title='Back' onPress={() => changeScreen(null)} color={THEME.GRAY_COLOR}>
            <AntDesign name='back' size={20} color='#fff'/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
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
    width: Dimensions.get('window').width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  }
})

