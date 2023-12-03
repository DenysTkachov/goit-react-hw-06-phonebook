import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';
import { filterReducer } from './filterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
  blacklist: ['someReducer'],
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'someReducer/REGISTER',
      ],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
