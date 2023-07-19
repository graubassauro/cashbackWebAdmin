import { useCallback, useState } from 'react'

import { ICategoryDTO } from '~models/Category'

export function useModalSelectData() {
  const [selectedCategory, setSelectedCategory] = useState<ICategoryDTO[]>([
    {
      id: 0,
      uId: '',
      name: 'Select category',
      categories: [],
    },
  ])

  const [selectedBrand, setSelectedBrand] = useState<ICategoryDTO>({
    id: 0,
    uId: '',
    name: 'Select brand',
    categories: [],
  })

  const handleSetSelectedCategory = useCallback((item: ICategoryDTO) => {
    setSelectedCategory((prevState) => [...prevState, item])
  }, [])

  const handleRemoveSelectedCategory = useCallback(
    (item: ICategoryDTO) => {
      const filteredCategories = selectedCategory.filter(
        (c) => c.name !== item.name,
      )

      setSelectedCategory(filteredCategories)
    },
    [selectedCategory],
  )

  const handleSetSelectedBrand = useCallback((item: ICategoryDTO) => {
    setSelectedBrand(item)
  }, [])

  const handleRemoveSelectedBrand = useCallback(() => {
    setSelectedBrand({
      id: 0,
      uId: '',
      name: 'Select brand',
      categories: [],
    })
  }, [setSelectedBrand])

  return {
    selectedCategory,
    selectedBrand,
    handleSetSelectedCategory,
    handleRemoveSelectedCategory,
    handleSetSelectedBrand,
    handleRemoveSelectedBrand,
  }
}
