import React from 'react';
import {StyleSheet} from 'react-native';
import ReminderScreen from '../Screens/ReminderScreen';
import ReminderDetailsScreen from '../Screens/ReminderDetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
const Stack = createNativeStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={ReminderScreen}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="Home" component={ReminderScreen} />
    <Stack.Screen name="Details" component={ReminderDetailsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigation;
