import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { ICategoryDTO } from '~models/Category'

type ItemComponentProps = {
  title: string
  data: ICategoryDTO
  hasChildren?: boolean
  handleSeeChildren: (category: ICategoryDTO) => void
  handleSelectItem: (category: ICategoryDTO) => void
}

function ItemComponent({
  title,
  data,
  hasChildren = false,
  handleSeeChildren,
  handleSelectItem,
}: ItemComponentProps) {
  if (hasChildren) {
    return (
      <Menu>
        <MenuButton
          borderRadius={6}
          p={2}
          borderWidth={1}
          borderColor="white"
          bgColor="white"
          textColor="purple.900"
          transition="border-color .35s"
          fontWeight={700}
          _hover={{
            borderColor: 'purple.900',
          }}
        >
          {data.name}
        </MenuButton>
        <MenuList>
          <MenuItem
            bgColor="white"
            textColor="gray.700"
            _hover={{
              bgColor: 'purple.900',
              textColor: 'white',
            }}
            onClick={() => handleSelectItem(data)}
          >
            Use this {title.split(' ')[2]}
          </MenuItem>
          <MenuItem
            bgColor="white"
            textColor="gray.700"
            _hover={{
              bgColor: 'purple.900',
              textColor: 'white',
            }}
            onClick={() => handleSeeChildren(data)}
          >
            See children
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Button
      borderRadius={6}
      borderWidth={1}
      borderColor="white"
      bgColor="white"
      textColor="purple.900"
      transition="border-color .35s"
      _hover={{
        borderColor: 'purple.900',
      }}
      onClick={() => handleSelectItem(data)}
    >
      {data.name}
    </Button>
  )
}

type ModalSelectProps = {
  title: string
  data: ICategoryDTO[]
  isOpen: boolean
  onClose: () => void
  handleSetSelectedCategory: (category: ICategoryDTO) => void
  handleSetSelectedBrand: (category: ICategoryDTO) => void
}

export function ModalSelect({
  title,
  data,
  isOpen = false,
  onClose,
  handleSetSelectedCategory,
  handleSetSelectedBrand,
}: ModalSelectProps) {
  const [categoryStack, setCategoryStack] = useState<ICategoryDTO[]>([])

  const handleSelectItem = useCallback(
    (item: ICategoryDTO) => {
      setCategoryStack([])

      if (title.includes('Categories')) {
        handleSetSelectedCategory(item)
      } else {
        handleSetSelectedBrand(item)
      }

      onClose()
    },
    [
      // setCategoryStack,
      title,
      handleSetSelectedCategory,
      handleSetSelectedBrand,
      onClose,
    ],
  )

  const handleCategoryClick = useCallback(
    (category: ICategoryDTO) => {
      setCategoryStack([...categoryStack, category])
      handleSetSelectedCategory(category)
    },
    [categoryStack, handleSetSelectedCategory],
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
          <Flex rowGap={2} columnGap={4} wrap="wrap" flex={1} w="100%">
            {currentCategories?.map((item) => (
              <ItemComponent
                key={`${item.uId}-${item.name}`}
                data={item}
                title={title}
                hasChildren={item.categories?.length > 0}
                handleSeeChildren={handleCategoryClick}
                handleSelectItem={handleSelectItem}
              />
            ))}
          </Flex>
        </ModalBody>

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
