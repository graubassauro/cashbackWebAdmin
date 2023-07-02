/* eslint-disable camelcase */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserTokenDTO } from '~models/User'
import { useAppSelector } from '~redux/store'

type AuthState = {
  user: UserTokenDTO | null
  token: string | null
  refresh_token: string | null
  is_first_login: boolean
}

type LoginDTO = {
  user: UserTokenDTO
  token: string
  refresh_token: string
  is_first_login: boolean
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refresh_token: null,
    is_first_login: false,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token, refresh_token, is_first_login },
      }: PayloadAction<LoginDTO>,
    ) => {
      state.user = user
      state.token = token
      state.refresh_token = refresh_token
      state.is_first_login = is_first_login
    },
    setFirstLogin: (state) => {
      state.is_first_login = !state.is_first_login
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.refresh_token = null
    },
  },
})

export const { setCredentials, setFirstLogin, logout } = authSlice.actions

export const auth = authSlice

export const useCurrentUserLogged = () => {
  return useAppSelector((state) => {
    return state.auth.user
  })
}
