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
import { useCallback, useState } from 'react'

import { ICategoryDTO } from '~models/Category'

type ModalSelectProps = {
  title: string
  data: ICategoryDTO[]
  isOpen: boolean
  onClose: () => void
}

export function ModalSelect({
  title,
  data,
  isOpen = false,
  onClose,
}: ModalSelectProps) {
  const [categoryStack, setCategoryStack] = useState<ICategoryDTO[]>([])

  const handleCategoryClick = useCallback(
    (category: ICategoryDTO) => {
      setCategoryStack([...categoryStack, category])
    },
    [categoryStack],
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
            {currentCategories.map((item) => (
              <Button
                key={item.id}
                borderRadius={6}
                borderWidth={1}
                borderColor="white"
                bgColor="white"
                textColor="purple.900"
                transition="border-color .35s"
                _hover={{
                  borderColor: 'purple.900',
                }}
                onClick={() => handleCategoryClick(item)}
              >
                {item.name}
              </Button>
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
