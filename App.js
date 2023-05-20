import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

import ReminderScreen from './app/src/Screens/ReminderScreen';
import AppButton from './app/src/components/AppButton';
import ReminderDetailsScreen from './app/src/Screens/ReminderDetailsScreen';
import AppNavigation from './app/src/navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {paddingTop: 30},
  txt: {fontWeight: 'bold', marginBottom: 10, color: 'purple'},
  TextInput: {
    borderColor: 'black',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
});
