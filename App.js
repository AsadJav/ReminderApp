import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
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

const styles = StyleSheet.create({});
