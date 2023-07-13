import { useMemo, useState } from 'react'
import {
  Center,
  Checkbox,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  DotsThreeVertical,
  Eye,
  Money,
  PencilSimpleLine,
  Trash,
} from '@phosphor-icons/react'

import { ImageTd, StatusTd, TableTd, TableTh } from '~components/Table'
import { Loading } from '~components/Loading'
import { TableFooter } from '~components/Table/TableFooter'
import { useCurrentStore } from '~redux/auth'
import { useGetProductsByStoreUidQuery } from '~services/products.service'

export function Products() {
  const [page, setPage] = useState(1)

  const store = useCurrentStore()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const { data: products, isLoading: isProductsLoading } =
    useGetProductsByStoreUidQuery({
      page,
      uId: store?.uId ?? '',
    })

  const pageParams = useMemo(() => {
    return {
      startPosition: products?.data.currentpage ?? 1,
      endPosition: products?.data.totalPages ?? 5,
      totalOfItems: products?.data.totalRecords ?? 0,
      totalOfItemsPerPage: products?.data.products.length ?? 10,
    }
  }, [
    products?.data.currentpage,
    products?.data.totalPages,
    products?.data.totalRecords,
    products?.data.products.length,
  ])

  return (
    <Table mt={8} bgColor="white" borderRadius={6}>
      {isProductsLoading ? (
        <Center w="100%" h={250}>
          <Loading />
        </Center>
      ) : (
        <>
          <Thead>
            <Tr borderBottomWidth={1} pb={4}>
              <Th>
                <Checkbox />
              </Th>
              {isWideVersion ? <TableTh title="IMAGE" /> : null}
              <TableTh title="PRODUCT" />
              {/* <TableTh title="BRAND NAME" /> */}
              <TableTh title="QUANTITY" />
              <TableTh title="PRICE ($)" />
              {isWideVersion ? <TableTh title="STATUS" /> : null}
              <TableTh title="ACTIONS" />
            </Tr>
          </Thead>
          <Tbody>
            {products?.data.products.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox />
                </Td>
                {isWideVersion ? (
                  <ImageTd
                    product={item.name}
                    src="https://github.com/thereallucas98.png"
                  />
                ) : null}
                <TableTd title={item.name} />
                {/* {isWideVersion ? <TableTd title={item.brandName} /> : null} */}
                <TableTd title={String(item.quantity)} />
                <TableTd title={String(item.price)} />
                {isWideVersion ? <StatusTd quantity={item.quantity} /> : null}
                <Td>
                  <Menu>
                    <MenuButton
                      p={2}
                      bgColor="transparent"
                      borderWidth={1}
                      borderColor="white"
                      _hover={{ bgColor: 'gray.300' }}
                      transition="ease-in 0.35s"
                    >
                      <DotsThreeVertical size={24} />
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Options">
                        <MenuItem
                          icon={<Icon as={Eye} size={24} color="gray.700" />}
                          bgColor="white"
                          textColor="gray.700"
                          _hover={{
                            bgColor: 'purple.900',
                            textColor: 'white',
                          }}
                        >
                          See product
                        </MenuItem>
                        <MenuItem
                          icon={
                            <Icon
                              as={PencilSimpleLine}
                              size={24}
                              color="gray.700"
                            />
                          }
                          bgColor="white"
                          textColor="gray.700"
                          _hover={{
                            bgColor: 'purple.900',
                            textColor: 'white',
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<Icon as={Money} size={24} color="gray.700" />}
                          bgColor="white"
                          textColor="gray.700"
                          _hover={{
                            bgColor: 'purple.900',
                            textColor: 'white',
                          }}
                        >
                          Highlight
                        </MenuItem>
                        <MenuItem
                          icon={<Icon as={Trash} size={24} color="gray.700" />}
                          bgColor="white"
                          textColor="gray.700"
                          _hover={{
                            bgColor: 'purple.900',
                            textColor: 'white',
                          }}
                        >
                          Delete
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </>
      )}
      <Tfoot>
        <Tr>
          <Td colSpan={8}>
            <TableFooter
              isWideVersion={isWideVersion}
              currentPage={page}
              currentPageEndAmount={pageParams.endPosition}
              currentPageTotalItems={pageParams.totalOfItemsPerPage}
              totalItems={pageParams.totalOfItems}
              onPageChange={setPage}
            />
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
