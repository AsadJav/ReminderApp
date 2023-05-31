import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import AppNavigation from './app/src/navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './app/src/Redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
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