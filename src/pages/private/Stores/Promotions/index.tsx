import { Center, VStack } from '@chakra-ui/react'

import { Loading } from '~components/Loading'
import { useAppSelector } from '~redux/store'
import { useGetPromotionsByStoreUidQuery } from '~services/promotion.service'

import { PromotionCard } from './components/PromotionCard'

export function Promotions() {
  const store = useAppSelector((state) => state.merchant.currentStore)
  const {
    data: promotions,
    isLoading: isLoadingPromotions,
    isFetching: isRequestionPromotions,
  } = useGetPromotionsByStoreUidQuery({
    uId: store?.uId ?? '',
  })

  if (isLoadingPromotions || isRequestionPromotions) {
    return (
      <Center>
        <Loading />
      </Center>
    )
  }

  return (
    <VStack w="100%" spacing={2}>
      {promotions?.data.map((p) => (
        <PromotionCard key={p.uId} item={p} />
      ))}
    </VStack>
  )
}
