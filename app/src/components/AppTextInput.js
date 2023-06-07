import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../colors/color';

function AppTextInput({onChangeText, value, placeholder}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.white}
      onChangeText={onChangeText}
      value={value}
      style={styles.ti}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  ti: {borderBottomColor: 'white', borderBottomWidth: 2, color: 'white'},
});

export default AppTextInput;
