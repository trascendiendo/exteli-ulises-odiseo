import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'; 
import thunk from 'redux-thunk';
import userReducer from '@/app/features/user/userSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userState']
}

const rootReducer = combineReducers({
  userState: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store
