import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { cashbackApi } from '~api/cashback-api.service'
import { auth } from '~redux/auth'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, auth.reducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [cashbackApi.reducerPath]: cashbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cashbackApi.middleware)
  },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
