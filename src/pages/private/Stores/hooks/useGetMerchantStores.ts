import { useGetAllMerchantStoresQuery } from '~services/merchant.service'

type MerchantStoreParams = {
  page: number
}

export function useGetMerchantStores({ page }: MerchantStoreParams) {
  const {
    data: stores,
    isLoading: isStoresLoading,
    isSuccess: isStoresSuccess,
  } = useGetAllMerchantStoresQuery({
    page,
    pagesize: 6,
  })

  return {
    stores,
    isStoresLoading,
    isStoresSuccess,
  }
}
