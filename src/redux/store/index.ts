import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { cashbackApi } from '~api/cashback-api.service'
import { auth } from '~redux/auth'
import { merchant } from '~redux/merchant'
import { form } from '~redux/form'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: auth.reducer,
  merchant: merchant.reducer,
  form: form.reducer,
  [cashbackApi.reducerPath]: cashbackApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cashbackApi.middleware)
  },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
