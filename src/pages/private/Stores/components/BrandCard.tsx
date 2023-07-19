import { Card, Center, Heading, Icon, VStack } from '@chakra-ui/react'
import { memo } from 'react'
import { BagSimple } from '@phosphor-icons/react'

import { ICategoryDTO } from '~models/Category'

type BrandCardProps = {
  data: ICategoryDTO
}

function BrandCardComponent({ data }: BrandCardProps) {
  return (
    <Card
      w="100%"
      h="8rem"
      p={4}
      bgColor="white"
      alignItems="flex-start"
      _hover={{
        bgColor: 'white',
        opacity: 0.8,
      }}
    >
      {/* Header */}
      <Center mt={4} gap={4} m="auto 0">
        <Icon as={BagSimple} w={10} h={10} color="yellow.700" />
        <VStack alignItems="flex-start" spacing={0}>
          <Heading
            fontSize={32}
            fontFamily="heading"
            color="gray.800"
            noOfLines={1}
          >
            {data.name}
          </Heading>
        </VStack>
      </Center>
      {/* <ModalSelect
        title="Select a category"
        data={data.categories}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
    </Card>
  )
}

export const BrandCard = memo(BrandCardComponent)
