import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from "./ui/AppTextBold";

/**
 * External usage:
 * <Navbar title="Todo App"/>
 *
 * @param title
 * @param subtitle
 * @returns {JSX.Element}
 * @constructor
 */
export const Navbar = ({ title, subtitle }) => {
  return (
    <View style={{...styles.navbar, ...Platform.select({
        ios: styles.navbarIos,
        android: styles.navbarAndroid,
      })}}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navbarAndroid: {
    height: 95,
    backgroundColor: THEME.MAIN_COLOR,
    marginBottom: 16,
  },
  navbarIos: {
    height: 44 + 44, // user interface guideline
    // borderBottomColor: THEME.MAIN_COLOR,
    // borderBottomWidth: 1,
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : 'white',
    fontSize: 18,
  },
})