import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Grid, VStack } from '@chakra-ui/react'

import { ActionButton, EmptyCardButton } from '~components/Buttons'
import { Loading } from '~components/Loading'
import { StoreCard } from './components/StoreCard'
import { BodyLayout } from '~layouts/Body'
import { IStoreDTO } from '~models/Store'

import { useGetMerchantStores } from './hooks/useGetMerchantStores'

function StoreContainer() {
  const [storesData, setStoresData] = useState<IStoreDTO[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const { stores, isStoresLoading, isStoresSuccess } = useGetMerchantStores({
    page: currentPage,
  })

  const totalPages = stores
    ? Math.ceil(stores.data.totalPages / 4)
    : currentPage + 1

  const handleIncreaseCurrentPage = useCallback(() => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (isStoresSuccess && stores) {
      setStoresData((previousStore) => {
        const existingIds = previousStore.map((item) => item.uId)
        const newStores = stores.data.stores.filter(
          (item) => !existingIds.includes(item.uId),
        )

        return [...previousStore, ...newStores]
      })
    }
  }, [isStoresSuccess, stores])

  return (
    <BodyLayout>
      <VStack alignItems="flex-end">
        <ActionButton
          title="New Store"
          linkingButton
          endpointString="/stores/new-store"
        />
      </VStack>

      {isStoresLoading && <Loading />}

      {!isStoresLoading && storesData.length === 0 ? (
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          gap={2}
          mt={8}
          maxW={1480}
          w="100%"
        >
          <EmptyCardButton />
          <EmptyCardButton />
          <EmptyCardButton />
          <EmptyCardButton />
        </Grid>
      ) : (
        <VStack w="100%" spacing={4}>
          <Grid
            templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
            gap={2}
            mt={8}
            w="100%"
          >
            {storesData.map((item) => (
              <StoreCard key={item.uId} data={item} />
            ))}
          </Grid>
          {currentPage < totalPages && (
            <ActionButton
              alignSelf="flex-end"
              title="Load more stores"
              onClick={handleIncreaseCurrentPage}
            />
          )}
        </VStack>
      )}
    </BodyLayout>
  )
}

export function Stores() {
  const location = useLocation()

  return location.pathname === '/stores' ? <StoreContainer /> : <Outlet />
}
