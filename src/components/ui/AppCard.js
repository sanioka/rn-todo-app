import React from 'react';

import { StyleSheet, View } from 'react-native';

export const AppCard = (props) => {
  return (
    <View style={ {...styles.default, ...props.style} }>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    padding: 20,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 8, // android shadow
    backgroundColor: '#fff',
    borderRadius: 10,
  }
})