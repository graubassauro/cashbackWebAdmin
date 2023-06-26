import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
