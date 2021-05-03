import React, { useState } from 'react';

import { StyleSheet, View, Button, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";

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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setVisibleModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <AppButton title='Back' onPress={goBack} color={THEME.GRAY_COLOR}>
            <AntDesign name='back' size={20} color='#fff'/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}>
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

