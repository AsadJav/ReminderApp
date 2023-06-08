import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import ReminderSlice from './ReminderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  reminders: ReminderSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
