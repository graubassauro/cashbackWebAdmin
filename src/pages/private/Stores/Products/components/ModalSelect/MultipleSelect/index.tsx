import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import { ICategoryDTO } from '~models/Category'
import { removeCategory, setNewCategory } from '~redux/form'
import { useAppSelector } from '~redux/store'

import { ItemComponent } from '../components/ItemSelect'
import { ItemToUnselect } from '../components/ItemToUnselect'

type ModalSelectProps = {
  title: string
  data: ICategoryDTO[]
  isUnSelectModal?: boolean
  isOpen: boolean
  onClose: () => void
}

export function MultipleSelect({
  title,
  data,
  isUnSelectModal = false,
  isOpen = false,
  onClose,
}: ModalSelectProps) {
  const [categoryStack, setCategoryStack] = useState<ICategoryDTO[]>([])

  const dispatch = useDispatch()
  const selectedCategories = useAppSelector(
    (state) => state.form.selectedCategory,
  )

  const categoryIsSelectedAlready = useCallback(
    (category: ICategoryDTO) => {
      for (const item of selectedCategories) {
        if (item.id === category.id || item.uId === category.uId) {
          return true
        } else if (item.categories.length > 0) {
          const foundInSubCategories = categoryIsSelectedAlready(category)
          if (foundInSubCategories) {
            return true
          }
          return false
        }
      }
    },
    [selectedCategories],
  )

  const handleSelectItem = useCallback(
    (item: ICategoryDTO) => {
      setCategoryStack([])
      dispatch(setNewCategory({ item }))

      onClose()
    },
    [dispatch, onClose],
  )

  const handleUnselectItem = useCallback(
    (item: ICategoryDTO) => {
      dispatch(removeCategory({ item }))
      onClose()
    },
    [dispatch, onClose],
  )

  const handleCategoryClick = useCallback(
    (category: ICategoryDTO) => {
      setCategoryStack([...categoryStack, category])
      dispatch(setNewCategory({ item: category }))
    },
    [categoryStack, dispatch],
  )

  const handleGoBack = useCallback(() => {
    const updatedStack = [...categoryStack]
    updatedStack.pop()
    setCategoryStack(updatedStack)
  }, [categoryStack])

  const currentCategories =
    categoryStack.length > 0
      ? categoryStack[categoryStack.length - 1].categories
      : data

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        {isUnSelectModal ? (
          <ModalBody>
            <Flex rowGap={2} columnGap={4} wrap="wrap" flex={1} w="100%">
              {currentCategories
                ?.filter((item) => item?.name !== 'Select brand')
                ?.map((item) => (
                  <ItemToUnselect
                    key={`${item?.uId}-${item?.name}`}
                    data={item}
                    handleUnselectItem={handleUnselectItem}
                  />
                ))}
            </Flex>
          </ModalBody>
        ) : (
          <ModalBody>
            {categoryStack.length > 0 && (
              <Button
                mb={4}
                onClick={handleGoBack}
                bgColor="transparent"
                color="purple.900"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                Go back
              </Button>
            )}

            <Text fontFamily="body" fontSize={16} fontWeight="regular">
              {currentCategories.length > 0
                ? 'Here is the children list. You can add to your product'
                : 'There is no data to list'}
            </Text>
            <Flex
              rowGap={2}
              columnGap={4}
              wrap="wrap"
              flex={1}
              w="100%"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              {currentCategories?.map((item) => (
                <ItemComponent
                  key={`${item.uId}-${item.name}`}
                  data={item}
                  title={title}
                  isSelected={categoryIsSelectedAlready(item)}
                  hasChildren={item.categories?.length > 0}
                  handleSeeChildren={handleCategoryClick}
                  handleSelectItem={handleSelectItem}
                />
              ))}
            </Flex>
          </ModalBody>
        )}

        <ModalFooter>
          <Button
            borderRadius={6}
            bgColor="purple.900"
            textColor="white"
            mr={3}
            onClick={onClose}
            isLoading={false}
            _hover={{
              opacity: 0.8,
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
