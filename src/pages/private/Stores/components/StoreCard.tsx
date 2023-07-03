import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HandPointing,
  Package,
  Pencil,
  Storefront,
  Trash,
} from '@phosphor-icons/react'

import { cashbackApi } from '~api/cashback-api.service'
import { IStoreDTO } from '~models/Store'
import { setCurrentStore } from '~redux/auth'
import { useDeleteStoreMutation } from '~services/stores.service'
import { useNavigate } from 'react-router-dom'

type StoreCardProps = {
  data: IStoreDTO
}

export function StoreCard({ data }: StoreCardProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [
    requestDeleteStore,
    { isLoading: isDeletingStore, isSuccess: isSuccessDeleted },
  ] = useDeleteStoreMutation()

  const handleDeleteStore = useCallback(() => {
    requestDeleteStore({
      uId: data.uId,
    })
  }, [requestDeleteStore, data])

  const handleNavigateToEditStore = useCallback(() => {
    dispatch(setCurrentStore({ currentStore: data }))
    navigate('/stores/edit-store')
  }, [dispatch, data, navigate])

  const handleNavigateToDetailStore = useCallback(() => {
    dispatch(setCurrentStore({ currentStore: data }))
    navigate('/stores/detail-store')
  }, [dispatch, data, navigate])

  useEffect(() => {
    if (isSuccessDeleted) {
      dispatch(cashbackApi.util.invalidateTags(['Merchant']))
      onClose()
    }
  }, [isSuccessDeleted, dispatch, onClose])

  return (
    <Card
      w="100%"
      h="16rem"
      p={4}
      bgColor="white"
      alignItems="flex-start"
      _hover={{
        bgColor: 'white',
        opacity: 0.8,
      }}
    >
      {/* Header */}
      <HStack
        borderBottomWidth={1}
        w="100%"
        py={4}
        px={4}
        justifyContent="space-between"
      >
        <Icon
          as={HandPointing}
          w={6}
          h={6}
          color="gray.700"
          _hover={{
            cursor: 'pointer',
          }}
          onClick={handleNavigateToDetailStore}
        />
        <HStack>
          <Icon
            as={Pencil}
            w={6}
            h={6}
            color="gray.700"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={handleNavigateToEditStore}
          />
          <Icon
            as={Trash}
            w={6}
            h={6}
            color="gray.700"
            _hover={{
              cursor: 'pointer',
            }}
            onClick={onOpen}
          />
        </HStack>
      </HStack>
      <HStack mt={4} spacing={4}>
        <Icon as={Storefront} w={10} h={10} color="yellow.700" />
        <VStack alignItems="flex-start" spacing={0}>
          <Heading
            fontSize={32}
            fontFamily="heading"
            color="gray.800"
            noOfLines={1}
          >
            {data.name}
          </Heading>
          <Text fontSize={16} fontFamily="body" color="gray.700">
            {data.email}
          </Text>
        </VStack>
      </HStack>
      <VStack alignItems="flex-start" mt={4}>
        <HStack spacing={2}>
          <Icon as={Package} color="gray.800" />
          <Text
            fontSize={18}
            fontFamily="body"
            fontWeight={700}
            color="gray.700"
          >
            {data.categories.length} categories
          </Text>
        </HStack>
        <HStack>
          <Icon as={Package} color="gray.800" />
          <Text
            fontSize={18}
            fontFamily="body"
            fontWeight={700}
            color="gray.700"
          >
            {data.products.length} Products
          </Text>
        </HStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
            Are you sure?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily="body" fontSize={16} fontWeight="regular">
              It seems that you want to delete <strong>{data.name}</strong>{' '}
              store. Doing this, you will delete all informations related to the
              store
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              borderWidth={1}
              borderRadius={6}
              bgColor="purple.900"
              textColor="white"
              mr={3}
              onClick={onClose}
              _hover={{
                bgColor: 'white',
                borderColor: 'purple.900',
                textColor: 'purple.900',
              }}
            >
              Cancel
            </Button>
            <Button
              borderWidth={1}
              borderRadius={6}
              bgColor="white"
              borderColor="purple.900"
              textColor="purple.900"
              mr={3}
              onClick={handleDeleteStore}
              isLoading={isDeletingStore}
              _hover={{
                bgColor: 'purple.900',
                borderColor: 'purple.900',
                textColor: 'white',
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}
