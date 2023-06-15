import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import ReminderSlice from './ReminderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSlice from './UserSlice';

const rootReducer = combineReducers({
  reminders: ReminderSlice,
  user: UserSlice,
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
