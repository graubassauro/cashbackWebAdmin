import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICategoryDTO } from '~models/Category'
import { useAppSelector } from '~redux/store'

type FormState = {
  categories: ICategoryDTO[] | null
  brands: ICategoryDTO[] | null
  selectedCategory: ICategoryDTO[]
  selectedBrand: ICategoryDTO
}

type FormSelectCategoryOrBrandDTO = {
  item: ICategoryDTO
}

const formSlice = createSlice({
  name: 'form',
  initialState: {
    categories: null,
    brands: null,
    selectedCategory: [
      {
        id: 0,
        uId: '',
        name: 'Select category',
        categories: [],
      },
    ],
    selectedBrand: {
      id: 0,
      uId: '',
      name: 'Select brand',
      categories: [],
    },
  } as FormState,
  reducers: {
    setNewCategory: (
      state,
      { payload: { item } }: PayloadAction<FormSelectCategoryOrBrandDTO>,
    ) => {
      const updatedState = [...state.selectedCategory, item]
      state.selectedCategory = updatedState
    },
    removeCategory: (
      state,
      { payload: { item } }: PayloadAction<FormSelectCategoryOrBrandDTO>,
    ) => {
      const filteredCategories = state.selectedCategory.filter(
        (c) => c.name !== item.name,
      )

      state.selectedCategory = filteredCategories
    },
    setNewBrand: (
      state,
      { payload: { item } }: PayloadAction<FormSelectCategoryOrBrandDTO>,
    ) => {
      state.selectedBrand = item
    },
    removeBrand: (state) => {
      state.selectedBrand = {
        id: 0,
        uId: '',
        name: 'Select brand',
        categories: [],
      }
    },
    resetFields: (state) => {
      state.selectedBrand = {
        id: 0,
        uId: '',
        name: 'Select brand',
        categories: [],
      }

      state.selectedCategory = [
        {
          id: 0,
          uId: '',
          name: 'Select category',
          categories: [],
        },
      ]
    },
  },
})

export const {
  setNewCategory,
  setNewBrand,
  removeCategory,
  removeBrand,
  resetFields,
} = formSlice.actions

export const form = formSlice

export const useCurrentCategoriesList = () => {
  return useAppSelector((state) => {
    return state.form.categories
  })
}

export const useCurrentBrandsList = () => {
  return useAppSelector((state) => {
    return state.form.brands
  })
}

export const useCurrentSelectedCategories = () => {
  return useAppSelector((state) => {
    return state.form.selectedCategory
  })
}

export const useCurrentSelectedBrand = () => {
  return useAppSelector((state) => {
    return state.form.selectedBrand
  })
}
