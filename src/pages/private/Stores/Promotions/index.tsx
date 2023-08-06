import {
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { DotsThreeVertical } from '@phosphor-icons/react'

import { Loading } from '~components/Loading'
import { /* StatusTd, */ TableTd, TableTh } from '~components/Table'
import { useAppSelector } from '~redux/store'
import { useGetPromotionsByStoreUidQuery } from '~services/promotion.service'
import { formatDate } from '~utils/formatDate'
// import { TableFooter } from '~components/Table/TableFooter'

export function Promotions() {
  const store = useAppSelector((state) => state.merchant.currentStore)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

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
    <Table mt={8} bgColor="white" borderRadius={6}>
      <Thead>
        <Tr borderBottomWidth={1} pb={4}>
          <TableTh title="TITLE" />
          {isWideVersion ? <TableTh title="DISCOUNT PERCENTAGE" /> : null}
          <TableTh title="OPENING DATE" />
          <TableTh title="FINISHING DATE" />
          {/* {isWideVersion ? <TableTh title="STATUS" /> : null} */}
          <TableTh title="ACTIONS" />
        </Tr>
      </Thead>
      <Tbody>
        {promotions?.data.map((item) => (
          <Tr key={item.uId}>
            <TableTd title={item.name} />
            <TableTd title={String(item.promotionPriceOff)} />
            <TableTd title={formatDate(item.initialDate)} />
            <TableTd title={formatDate(item.finalDate)} />
            <Td>
              <Button
                bgColor="transparent"
                borderWidth={1}
                borderColor="white"
                _hover={{ bgColor: 'white', borderColor: 'gray.400' }}
                transition="ease-in 0.35s"
              >
                <DotsThreeVertical size={24} />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={8}>
            {/* <TableFooter
              currentPageStartAmount={1}
              currentPageEndAmount={2}
              totalItems={10}
            /> */}
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
