import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

function AppTextInput({onChangeText, value}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter the Reminder Name Here"
        placeholderTextColor="white"
        onChangeText={onChangeText}
        value={value}
        style={styles.ti}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  ti: {borderBottomColor: 'white', borderBottomWidth: 2, color: 'white'},
});

export default AppTextInput;
