import {StyleSheet} from 'react-native';
import React from 'react';
import AppNavigation from './app/src/navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './app/src/Redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import LoginScreen from './app/src/Screens/LoginScreen';
import ReminderScreen from './app/src/Screens/ReminderScreen';
import HeaderComponent from './app/src/components/HeaderComponent';
import ImageComponent from './app/src/components/ImageComponent';
import ProfileScreen from './app/src/Screens/ProfileScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    // <LoginScreen />
    // <HeaderComponent />
    // <ImageComponent />
    // <ProfileScreen />
  );
}

const styles = StyleSheet.create({});
