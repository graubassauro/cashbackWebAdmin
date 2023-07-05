import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Center,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  TextT,
  NavigationArrow,
  At,
  Phone,
  CaretDown,
} from '@phosphor-icons/react'

import { ActionButton } from '~components/Buttons'
import { BodyLayout } from '~layouts/Body'
import { useCurrentStore } from '~redux/auth'

import { Audience } from './Audience'
import { Products } from './Products'

const detailStoreTabs = ['products', 'audience', 'feedback'] as const
type DetailStoreTab = (typeof detailStoreTabs)[number]

/**
 * Tab Item Compoennt
 */

type TabItemProps = {
  tab: DetailStoreTab
  title: string
  onSelected: (tab: DetailStoreTab) => void
  isActive: boolean
}

const TabItem = ({ title, tab, isActive, onSelected }: TabItemProps) => {
  const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1)

  const onSelectedTab = useCallback(() => {
    onSelected(tab)
  }, [onSelected, tab])

  return (
    <MenuItem
      bgColor={isActive ? 'purple.900' : 'transparent'}
      textColor={isActive ? 'white' : 'gray.700'}
      _selected={{
        bgColor: 'purple.900',
        textColor: 'white',
      }}
      _hover={{
        bgColor: 'purple.900',
        textColor: 'white',
        opacity: isActive ? 1 : 0.2,
      }}
      onClick={onSelectedTab}
    >
      {titleCapitalize}
    </MenuItem>
  )
}

const optionsTabData = [
  {
    inputPlaceholder: 'Search for a product',
    groupedData: {
      title: 'Categories',
      urlEndpoint: 'products/categories',
    },
    newData: {
      title: 'New product',
      urlEndpoint: 'products/new-product',
    },
  },
  {
    inputPlaceholder: 'Search for a promotion',
    groupedData: {
      title: 'Segments',
      urlEndpoint: 'audience/segments',
    },
    newData: {
      title: 'New highlight',
      urlEndpoint: 'audience/new-highlight',
    },
  },
]

/**
 * Tab Options Compoennt
 */

type TabOptionsProps = {
  data: {
    inputPlaceholder: string
    groupedData: {
      title: string
      urlEndpoint: string
    }
    newData: {
      title: string
      urlEndpoint: string
    }
  }
}

const TabOptions = ({ data }: TabOptionsProps) => {
  const navigate = useNavigate()

  return (
    <HStack>
      <Input
        bgColor="white"
        borderColor="gray.700"
        borderWidth={1}
        borderRadius={8}
        px={6}
        py={2}
        fontSize={16}
        fontWeight={400}
        textColor="gray.700"
        transition="ease-in 0.35s"
        placeholder={data.inputPlaceholder}
        _placeholder={{
          color: 'gray.700',
        }}
        _hover={{
          borderColor: 'gray.700',
        }}
        _focus={{
          borderColor: 'gray.700',
        }}
      />
      <ActionButton
        title={data.groupedData.title}
        onClick={() => navigate(`../../${data.groupedData.urlEndpoint}`)}
      />
      <ActionButton
        title={data.newData.title}
        onClick={() => navigate(`../../${data.newData.urlEndpoint}`)}
      />
    </HStack>
  )
}

export function DetailedStore() {
  const [selectedTab, setSelectedTab] = useState<DetailStoreTab>('products')

  const titleCapitalize =
    selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)

  const tabs = useMemo((): Record<DetailStoreTab, React.JSX.Element | null> => {
    return {
      products: <Products />,
      audience: <Audience />,
      feedback: <h1>Oi</h1>,
    }
  }, [])

  const optionsTab = useMemo((): Record<
    DetailStoreTab,
    React.JSX.Element | null
  > => {
    return {
      products: <TabOptions data={optionsTabData[0]} />,
      audience: <TabOptions data={optionsTabData[1]} />,
      feedback: null,
    }
  }, [])

  const store = useCurrentStore()
  // const navigate = useNavigate()

  // const handleNavigateToProductsStore = useCallback(() => {
  //   navigate('/stores/products')
  // }, [navigate])

  // const handleNavigateToPromotionsStore = useCallback(() => {
  //   navigate('/stores/audience')
  // }, [navigate])

  return (
    <BodyLayout>
      <Image
        w="100%"
        h={250}
        objectFit="cover"
        src={
          'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
        borderRadius="md"
        alt={store?.name}
      />
      <Center mt={4}>
        <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap={2} mt={8}>
          <HStack>
            <Icon as={TextT} color="gray.700" h={6} w={6} />
            <Text
              fontSize={14}
              fontWeight={400}
              color="gray.900"
              fontFamily="heading"
            >
              {store?.name}
            </Text>
          </HStack>
          <HStack>
            <Icon as={At} color="gray.700" h={6} w={6} />
            <Text
              fontSize={14}
              fontWeight={400}
              color="gray.900"
              fontFamily="heading"
            >
              {store?.email}
            </Text>
          </HStack>
          <HStack>
            <Icon as={Phone} color="gray.700" h={6} w={6} />
            <Text
              fontSize={14}
              fontWeight={400}
              color="gray.900"
              fontFamily="heading"
            >
              {store?.phoneNumber}
            </Text>
          </HStack>
          <HStack>
            <Icon as={NavigationArrow} color="gray.700" h={6} w={6} />
            <Text
              fontSize={14}
              fontWeight={400}
              color="gray.900"
              fontFamily="heading"
            >
              {store?.storeAddress.streetNameFormatted}
            </Text>
          </HStack>
        </Grid>
      </Center>
      <VStack mt={8}>
        <HStack w="100%" justifyContent="space-between">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<CaretDown />}
              bgColor="transparent"
              textColor="gray.800"
              fontSize={18}
              fontWeight={700}
              _hover={{
                bgColor: 'gray.400',
              }}
            >
              {titleCapitalize}
            </MenuButton>
            <MenuList>
              {detailStoreTabs.map((tab) => (
                <TabItem
                  key={tab}
                  tab={tab}
                  title={tab}
                  onSelected={setSelectedTab}
                  isActive={selectedTab === tab}
                />
              ))}
            </MenuList>
          </Menu>
          {optionsTab[selectedTab]}
        </HStack>
        {tabs[selectedTab]}
      </VStack>
      {/* <HStack w="100%" spacing={4} mt={8}>
        <Card w="100%" p={4}>
          <VStack alignItems="center" justifyContent="center">
            <Icon as={Package} color="yellow.700" h={16} w={16} />
            <Text fontSize={16} fontWeight={400} color="gray.900">
              Products
            </Text>
          </VStack>
          <HStack justifyContent="space-between">
            <Text>{store?.products.length} items</Text>
            <Icon
              as={CursorClick}
              color="gray.700"
              h={6}
              w={6}
              _hover={{
                cursor: 'pointer',
              }}
              onClick={handleNavigateToProductsStore}
            />
          </HStack>
        </Card>
        <Card w="100%" p={4}>
          <VStack alignItems="center" justifyContent="center">
            <Icon as={Coins} color="yellow.700" h={16} w={16} />
            <Text fontSize={16} fontWeight={400} color="gray.900">
              Promotions
            </Text>
          </VStack>
          <HStack justifyContent="space-between">
            <Text>You can create now</Text>
            <Icon
              as={CursorClick}
              color="gray.700"
              h={6}
              w={6}
              _hover={{
                cursor: 'pointer',
              }}
              onClick={handleNavigateToPromotionsStore}
            />
          </HStack>
        </Card>
      </HStack> */}
    </BodyLayout>
  )
}
