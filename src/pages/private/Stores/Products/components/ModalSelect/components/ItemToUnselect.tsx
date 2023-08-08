import { Button, Icon } from '@chakra-ui/react'
import { X } from '@phosphor-icons/react'

import { ICategoryDTO } from '~models/Category'

type ItemToUnselectProps = {
  data: ICategoryDTO
  handleUnselectItem: (item: ICategoryDTO) => void
}

export function ItemToUnselect({
  data,
  handleUnselectItem,
}: ItemToUnselectProps) {
  return (
    <Button
      borderRadius={6}
      p={2}
      borderWidth={1}
      borderColor="white"
      bgColor="white"
      textColor="purple.900"
      fontWeight={700}
      transition="border-color .35s"
      rightIcon={<Icon as={X} color="purple.900" size={32} />}
      _hover={{
        borderColor: 'purple.900',
      }}
      onClick={() => handleUnselectItem(data)}
    >
      {data?.name}
    </Button>
  )
}
