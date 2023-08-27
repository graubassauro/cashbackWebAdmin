import { Center, Input, Stack, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { PromotionCard } from './components/PromotionCard'
import { Loading } from '~components/Loading'
import { useAppSelector } from '~redux/store'
import { useGetPromotionsByStoreUidQuery } from '~services/promotion.service'
import { ActionButton } from '~components/Buttons'

export function Promotions() {
  const navigate = useNavigate()

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
      <Stack w="100%" flexDir="row" my={4}>
        <Input
          bgColor="white"
          borderColor="gray.700"
          borderWidth={1}
          borderRadius={8}
          px={4}
          py={4}
          fontSize={16}
          fontWeight={400}
          textColor="gray.700"
          transition="ease-in 0.35s"
          placeholder="Search for promotion"
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
          title="New promotion"
          onClick={() => navigate(`../../promotions/new-promotion`)}
        />
      </Stack>
      {promotions?.data.map((p) => (
        <PromotionCard key={p.uId} item={p} />
      ))}
    </VStack>
  )
}
