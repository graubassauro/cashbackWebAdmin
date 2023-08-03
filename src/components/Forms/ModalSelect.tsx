import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Center,
  Flex,
  Icon,
  Input,
  InputProps,
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
  useToast,
} from '@chakra-ui/react'
import { X } from '@phosphor-icons/react'

import { cashbackApi } from '~api/cashback-api.service'
import { Loading } from '~components/Loading'
import { ICategoryDTO } from '~models/Category'
import {
  removeBrand,
  removeCategory,
  setNewBrand,
  setNewCategory,
} from '~redux/form'
import { useAppSelector } from '~redux/store'
import { usePostBrandByStoreUidMutation } from '~services/brands.service'

type ItemToUnselectProps = {
  data: ICategoryDTO
  handleUnselectItem: (item: ICategoryDTO) => void
}

function ItemToUnselect({ data, handleUnselectItem }: ItemToUnselectProps) {
  return (
    <Button
      borderRadius={6}
      p={2}
      borderWidth={1}
      borderColor="white"
      bgColor="white"
      textColor="purple.900"
      fontWeight={700}
      transition="border-color .35s"
      rightIcon={<Icon as={X} color="purple.900" size={32} />}
      _hover={{
        borderColor: 'purple.900',
      }}
      onClick={() => handleUnselectItem(data)}
    >
      {data?.name}
    </Button>
  )
}

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
          transition="border-color .35s"
          textColor="purple.900"
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

type ModalSelectProps = InputProps & {
  title: string
  data: ICategoryDTO[]
  isUnSelectModal?: boolean
  isOpen: boolean
  isLoadingBrands?: boolean
  onClose: () => void
}

export function ModalSelect({
  title,
  data,
  isOpen = false,
  isUnSelectModal = false,
  isLoadingBrands = false,
  onClose,
  ...rest
}: ModalSelectProps) {
  const [categoryStack, setCategoryStack] = useState<ICategoryDTO[]>([])

  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })
  const dispatch = useDispatch()
  const toast = useToast()

  const handleSelectItem = useCallback(
    (item: ICategoryDTO) => {
      setCategoryStack([])

      if (title.includes('Categories')) {
        dispatch(setNewCategory({ item }))
      } else {
        dispatch(setNewBrand({ item }))
      }

      onClose()
    },
    [title, dispatch, onClose],
  )

  const handleUnselectItem = useCallback(
    (item: ICategoryDTO) => {
      if (title.includes('Categories')) {
        dispatch(removeCategory({ item }))
      } else {
        dispatch(removeBrand())
        onClose()
      }
    },
    [title, dispatch, onClose],
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

  // ADD BRAND

  const [createBrand, { isLoading: isCreatingBrand, isSuccess: hasCreated }] =
    usePostBrandByStoreUidMutation()

  const captureNewBrandName = useCallback(() => {
    const brandName: string | null = window.prompt('Please, enter a brand name')

    if (brandName) {
      createBrand({
        name: brandName,
        storeUId: store?.uId ?? '',
      })
    }
  }, [createBrand, store?.uId])

  const currentCategories =
    categoryStack.length > 0
      ? categoryStack[categoryStack.length - 1].categories
      : data

  /**
   * useEffect after createBrand
   */
  useEffect(() => {
    if (hasCreated) {
      dispatch(cashbackApi.util.invalidateTags(['Brands']))

      toast({
        title: `New brand was created`,
        description: 'Now you can associate to your products!',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [hasCreated, dispatch, toast])

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
            {title.includes('Brands') ? (
              <Input
                w="100%"
                h={14}
                color="gray.800"
                borderRadius="10"
                borderWidth={1}
                borderColor="gray.600"
                bgColor="gray.400"
                variant="unstyled"
                px="4"
                my="4"
                placeholder="Search by name (3 caracteres to start)"
                _placeholder={{
                  color: 'gray.700',
                }}
                {...rest}
              />
            ) : null}
            <Flex
              rowGap={2}
              columnGap={4}
              wrap="wrap"
              flex={1}
              w="100%"
              alignItems={
                isCreatingBrand || isLoadingBrands ? 'center' : 'flex-start'
              }
              justifyContent={
                isCreatingBrand || isLoadingBrands ? 'center' : 'flex-start'
              }
            >
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

              {currentCategories.length === 0 ? (
                <Center flexDirection="column" alignItems="flex-start" gap={4}>
                  {isCreatingBrand || isLoadingBrands ? (
                    <Center>
                      <Loading />
                    </Center>
                  ) : (
                    <>
                      <Text fontFamily="body" fontSize={16} fontWeight={400}>
                        Add or create a new brand that you are interest to your
                        product
                      </Text>
                      <Button
                        borderRadius={6}
                        bgColor="purple.900"
                        textColor="white"
                        mr={3}
                        isLoading={false}
                        _hover={{
                          opacity: 0.8,
                        }}
                        onClick={captureNewBrandName}
                      >
                        Click here
                      </Button>
                    </>
                  )}
                </Center>
              ) : null}
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
