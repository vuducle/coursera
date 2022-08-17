import { configureStore } from '@reduxjs/toolkit'
import appReducer from './actions'
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: {
    appState: persistedReducer,
  },
  middleware: [thunk]
})

export const persistor = persistStore(store)