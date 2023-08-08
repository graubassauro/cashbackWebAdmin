import { useCallback, useState } from 'react'
import { Grid, useDisclosure } from '@chakra-ui/react'

import { ButtonInput } from '~components/Forms/Inputs'
import { useAppSelector } from '~redux/store'
import { useGetAllCategoriesQuery } from '~services/category.service'

import { UniqueSelect } from './UniqueSelect'
import { MultipleSelect } from './MultipleSelect'

export function ModalSelect() {
  const [modalListType, setModalListType] = useState<'category' | 'brand'>(
    'category',
  )

  const { selectedCategory, selectedBrand } = useAppSelector(
    (state) => state.form,
  )

  const filteredCategories = selectedCategory.filter((c) => c.uId !== '')

  /**
   * OPEN SELECT MODALS
   */
  const {
    isOpen: isUniqueOpenModal,
    onOpen: onOpenUniqueModalButton,
    onClose: onCloseUniqueModalButton,
  } = useDisclosure()

  const {
    isOpen: isMultipleSelectOpenModal,
    onOpen: onOpenMultipleSelectButton,
    onClose: onCloseMultipleSelectButton,
  } = useDisclosure()

  const {
    isOpen: isMultipleUnselectOpenModal,
    onOpen: onOpenMultipleUnselectButton,
    onClose: onCloseMultipleUnselectButton,
  } = useDisclosure()

  /**
   * APIs
   */

  const {
    data: categories,
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  const handleOpenCorrectModal = useCallback(
    (type: 'brand' | 'category') => {
      setModalListType(type)

      if (type === 'brand') {
        onOpenUniqueModalButton()
      } else {
        onOpenMultipleSelectButton()
      }
    },
    [onOpenUniqueModalButton, onOpenMultipleSelectButton],
  )

  const modalTitle = modalListType === 'brand' ? 'Brands' : 'Categories'

  const categoriesLabel =
    selectedCategory.length > 1
      ? selectedCategory
          .filter((category) => category.id !== 0)
          .map((category) => category.name)
          .join(', ')
      : selectedCategory[0].name

  const isLoadingButton = isFetchingCategories || isLoadingCategories

  return (
    <>
      <Grid
        gap={2}
        w="100%"
        alignItems="center"
        templateColumns={['1fr', '1fr', '1fr 1fr']}
      >
        <ButtonInput
          label="Category"
          title={categoriesLabel}
          modalButton="category"
          isLoading={isLoadingButton}
          hasSelectedItems={selectedCategory.length > 1}
          onHandleOpenCorrectModal={handleOpenCorrectModal}
          onHandleOpenCorrectUnselectModal={onOpenMultipleUnselectButton}
        />
        <ButtonInput
          label="Brand"
          title={selectedBrand?.name ?? 'Select brand'}
          modalButton="brand"
          isLoading={isLoadingButton}
          onHandleOpenCorrectModal={onOpenMultipleSelectButton}
          onHandleOpenCorrectUnselectModal={onOpenMultipleSelectButton}
        />
      </Grid>

      {/* CATEGORIES MODAL */}
      <MultipleSelect
        data={categories?.data ?? []}
        title={modalTitle}
        isOpen={isMultipleSelectOpenModal}
        onClose={onCloseMultipleSelectButton}
      />

      {/* CATEGORIES UNSELECT MODAL */}
      <MultipleSelect
        title={modalTitle}
        isUnSelectModal
        data={filteredCategories}
        isOpen={isMultipleUnselectOpenModal}
        onClose={onCloseMultipleUnselectButton}
      />

      {/* BRANDS MODAL */}
      <UniqueSelect
        title={modalTitle}
        isOpen={isUniqueOpenModal}
        onClose={onCloseUniqueModalButton}
      />
    </>
  )
}
