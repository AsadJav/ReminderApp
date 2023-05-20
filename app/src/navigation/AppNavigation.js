import React from 'react';
import {StyleSheet, View} from 'react-native';

import ReminderScreen from '../Screens/ReminderScreen';
import ReminderDetailsScreen from '../Screens/ReminderDetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={ReminderScreen}>
    <Stack.Screen name="Home" component={ReminderScreen} />
    <Stack.Screen name="Details" component={ReminderDetailsScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigation;
