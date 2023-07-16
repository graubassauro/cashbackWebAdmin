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

  const handleSetSelectedBrand = useCallback((item: ICategoryDTO) => {
    setSelectedBrand(item)
  }, [])

  return {
    selectedCategory,
    selectedBrand,
    handleSetSelectedCategory,
    handleSetSelectedBrand,
  }
}
