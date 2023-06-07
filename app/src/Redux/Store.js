import {Iterable} from 'immutable';
import {
  combineReducers,
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import ReminderSlice from './ReminderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isSerializable = value => Iterable.isIterable(value) || isPlain(value);

const getEntries = value =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

const rootReducer = combineReducers({
  reminders: ReminderSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//export const store = createStore(persistedReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [serializableMiddleware],
});

export const persistor = persistStore(store);
