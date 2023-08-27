import { useMemo } from 'react'
import {
  Center,
  Grid,
  HStack,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { TextT, NavigationArrow, At, Phone } from '@phosphor-icons/react'

import { useAppSelector } from '~redux/store'
import { BodyLayout } from '~layouts/Body'

import { Promotions } from './Promotions'
import { Products } from './Products'

const detailStoreTabs = ['Products', 'Promotions'] as const

export function DetailedStore() {
  const store = useAppSelector((state) => {
    return state.merchant.currentStore
  })

  const HeaderStoreDetailComponent = useMemo(() => {
    return (
      <VStack>
        <Image
          w="100%"
          h={250}
          objectFit="cover"
          src={
            'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          }
          borderRadius="md"
          alt={store?.name}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Center mt={4}>
          <Grid
            templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
            gap={2}
            mt={8}
          >
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
      </VStack>
    )
  }, [
    store?.email,
    store?.name,
    store?.phoneNumber,
    store?.storeAddress.streetNameFormatted,
  ])

  return (
    <BodyLayout>
      {HeaderStoreDetailComponent}
      <Tabs mt={4} variant="line" colorScheme="purple">
        <TabList>
          {detailStoreTabs.map((t) => (
            <Tab key={t}>{t}</Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Products />
          </TabPanel>
          <TabPanel>
            <Promotions />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BodyLayout>
  )
}
