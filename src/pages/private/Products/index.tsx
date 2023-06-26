import {
  Button,
  Checkbox,
  HStack,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { products } from 'mock/products'

import { ActionButton } from '~components/Buttons'
import { ImageTd, StatusTd, TableTd, TableTh } from '~components/Table'
import { TableFooter } from '~components/Table/TableFooter'
import { BodyLayout } from '~layouts/Body'

export function Products() {
  return (
    <BodyLayout>
      <HStack justifyContent="space-between">
        <Heading fontSize={32} fontWeight={700} color="gray.900">
          Product Management
        </Heading>
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
            placeholder="Search for a product"
            _placeholder={{
              color: 'gray.700',
            }}
          />
          <ActionButton title="Filter" />
          <ActionButton
            title="Categories"
            linkingButton
            endpointString="categories"
          />
          <ActionButton
            title="New Product"
            linkingButton
            endpointString="new-product"
          />
        </HStack>
      </HStack>
      {/* Table - TODO: Improve to a component */}
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
          {products.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Checkbox />
              </Td>
              <ImageTd
                product={item.name}
                src="https://github.com/thereallucas98.png"
              />
              <TableTd title={item.category} />
              <TableTd title={item.brand} />
              <TableTd title={String(item.quantity)} />
              <TableTd title={String(item.price)} />
              <StatusTd status={item.status} title="Available" />
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
              <TableFooter />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </BodyLayout>
  )
}
