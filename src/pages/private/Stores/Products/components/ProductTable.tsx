import { NavLink } from 'react-router-dom'
import {
  Badge,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { DotsThreeVertical } from '@phosphor-icons/react'

import { Loading } from '~components/Loading'
import { ImageTd, StatusTd, TableTd, TableTh } from '~components/Table'
import { TableFooter } from '~components/Table/TableFooter'
import { ICategoryDTO } from '~models/Category'
import { IProductStoreDTO } from '~models/Store'

type MenuItemComponentProps = {
  productUid: string
  onHandleDeleteProduct: (productUid: string) => void
}

function MenuItemComponent({
  productUid,
  onHandleDeleteProduct,
}: MenuItemComponentProps) {
  return (
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
          <MenuDivider />
          <NavLink to={`/products/edit-product/${productUid}`}>
            <MenuItem
              bgColor="white"
              textColor="gray.700"
              _hover={{
                bgColor: 'purple.900',
                textColor: 'white',
              }}
            >
              Edit
            </MenuItem>
          </NavLink>
          <MenuItem
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
            bgColor="white"
            textColor="gray.700"
            _hover={{
              bgColor: 'purple.900',
              textColor: 'white',
            }}
            onClick={() => onHandleDeleteProduct(productUid)}
          >
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

type ProductTableProps = {
  products: IProductStoreDTO[]
  isLoading: boolean
  isDeleting: boolean
  isWideVersion?: boolean
  page: number
  endPosition: number
  totalOfItems: number
  totalOfItemsPerPage: number
  onHandleSetUidToDelete: (uId: string) => void
  onPageChange: (page: number) => void
}

export function ProductTable({
  products,
  isLoading,
  isDeleting,
  isWideVersion,
  page,
  endPosition,
  totalOfItems,
  totalOfItemsPerPage,
  onHandleSetUidToDelete,
  onPageChange,
}: ProductTableProps) {
  return (
    <Table mt={8} bgColor="white" borderRadius={6}>
      {isLoading || isDeleting ? (
        <Center w="100%" h={250}>
          <Loading />
        </Center>
      ) : (
        <>
          <Thead>
            <Tr borderBottomWidth={1} pb={4}>
              <TableTh title="IMAGE" />
              <TableTh title="PRODUCT" />
              <TableTh title="BRAND NAME" />
              <TableTh title="QUANTITY" />
              <TableTh title="PRICE ($)" />
              <TableTh title="STATUS" />
              <TableTh title="ACTIONS" />
            </Tr>
          </Thead>
          <Tbody>
            {products.map((item) => (
              <Tr key={item.id}>
                <ImageTd
                  product={item.name}
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : 'https://github.com/thereallucas98.png'
                  }
                />
                <Td>
                  <Text fontSize={14} fontWeight={400} color="gray.900">
                    {item.name}
                  </Text>
                  <HStack wrap="wrap" mt={2}>
                    {item.categories?.map((category: ICategoryDTO) => (
                      <Badge colorScheme="purple" key={category.uId}>
                        {category.name}
                      </Badge>
                    ))}
                  </HStack>
                </Td>
                <TableTd title={item.brandName ? item.brandName : 'TBA'} />
                <TableTd title={String(item.quantity)} />
                <TableTd title={String(item.price)} />
                <StatusTd quantity={item.quantity} />
                <Td>
                  <MenuItemComponent
                    productUid={item.uId}
                    onHandleDeleteProduct={onHandleSetUidToDelete}
                  />
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
              currentPageEndAmount={endPosition}
              currentPageTotalItems={totalOfItemsPerPage}
              totalItems={totalOfItems}
              onPageChange={onPageChange}
            />
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
