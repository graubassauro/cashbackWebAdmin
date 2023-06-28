import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { cashbackApi } from '~api/cashback-api.service'
import { auth } from '~redux/auth'

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    [cashbackApi.reducerPath]: cashbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cashbackApi.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
