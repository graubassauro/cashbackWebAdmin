import { useMemo } from 'react'
import {
  Button,
  Checkbox,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { DotsThreeVertical } from '@phosphor-icons/react'

import { ImageTd, StatusTd, TableTd, TableTh } from '~components/Table'
import { TableFooter } from '~components/Table/TableFooter'
import { useCurrentStore } from '~redux/auth'

export function Products() {
  const store = useCurrentStore()

  const pageParams = useMemo(() => {
    return {
      startPosition: 1,
      endPosition: store?.products?.length ?? 5,
      totalOfItems: store?.products?.length ?? 0,
    }
  }, [store?.products])

  return (
    <Table mt={8} bgColor="white" borderRadius={6}>
      <Thead>
        <Tr borderBottomWidth={1} pb={4}>
          <Th>
            <Checkbox />
          </Th>
          <TableTh title="IMAGE" />
          <TableTh title="CATEGORY NAME" />
          <TableTh title="BRAND NAME" />
          <TableTh title="QUANTITY" />
          <TableTh title="PRICE ($)" />
          <TableTh title="STATUS" />
          <TableTh title="ACTIONS" />
        </Tr>
      </Thead>
      <Tbody>
        {store?.products.map((item) => (
          <Tr key={item.id}>
            <Td>
              <Checkbox />
            </Td>
            <ImageTd
              product={item.name}
              src="https://github.com/thereallucas98.png"
            />
            <TableTd title="Category" />
            <TableTd title="Brand" />
            <TableTd title={String(item.quantity)} />
            <TableTd title={String(item.price)} />
            <StatusTd status="green" title="Available" />
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
            <TableFooter
              currentPageStartAmount={pageParams.startPosition}
              currentPageEndAmount={pageParams.endPosition}
              totalItems={pageParams.totalOfItems}
            />
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
