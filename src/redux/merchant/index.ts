import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IStoreDTO } from '~models/Store'

type MerchantState = {
  currentStore: IStoreDTO | null
}

type MerchantStoreDTO = {
  currentStore: IStoreDTO
}

const merchantSlice = createSlice({
  name: 'merchant',
  initialState: {
    currentStore: null,
  } as MerchantState,
  reducers: {
    setCurrentStore: (
      state,
      { payload: { currentStore } }: PayloadAction<MerchantStoreDTO>,
    ) => {
      state.currentStore = currentStore
    },
  },
})

export const { setCurrentStore } = merchantSlice.actions

export const merchant = merchantSlice
