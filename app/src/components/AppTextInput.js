import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../colors/color';

function AppTextInput({onChangeText, value, placeholder, style}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.white}
      onChangeText={onChangeText}
      value={value}
      style={[styles.ti, style]}
    />
  );
}

const styles = StyleSheet.create({
  ti: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
    color: COLORS.white,
  },
});

export default AppTextInput;
