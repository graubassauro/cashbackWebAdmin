/* eslint-disable camelcase */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserTokenDTO } from '~models/User'

type AuthState = {
  user: UserTokenDTO | null
  token: string | null
  refresh_token: string | null
}

type LoginDTO = { user: UserTokenDTO; token: string; refresh_token: string }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refresh_token: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token, refresh_token } }: PayloadAction<LoginDTO>,
    ) => {
      state.user = user
      state.token = token
      state.refresh_token = refresh_token
    },
  },
})

export const { setCredentials } = authSlice.actions

export const auth = authSlice
