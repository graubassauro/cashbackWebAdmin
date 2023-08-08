import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { ICategoryDTO } from '~models/Category'

type ItemComponentProps = {
  title: string
  data: ICategoryDTO
  isSelected?: boolean
  hasChildren?: boolean
  handleSeeChildren?: (category: ICategoryDTO) => void
  handleSelectItem: (category: ICategoryDTO) => void
}

export function ItemComponent({
  title,
  data,
  isSelected = false,
  hasChildren = false,
  handleSeeChildren,
  handleSelectItem,
}: ItemComponentProps) {
  if (hasChildren) {
    return (
      <Menu>
        <MenuButton
          borderRadius={6}
          p={2}
          borderWidth={1}
          borderColor="white"
          bgColor="white"
          transition="border-color .35s"
          textColor="purple.900"
          fontWeight={700}
          _hover={{
            borderColor: 'purple.900',
          }}
        >
          {data.name}
        </MenuButton>
        <MenuList>
          <MenuItem
            bgColor="white"
            textColor="gray.700"
            _hover={{
              bgColor: 'purple.900',
              textColor: 'white',
            }}
            onClick={() => handleSelectItem(data)}
          >
            Use this {title.split(' ')[2]}
          </MenuItem>
          <MenuItem
            bgColor="white"
            textColor="gray.700"
            _hover={{
              bgColor: 'purple.900',
              textColor: 'white',
            }}
            onClick={() => handleSeeChildren?.(data)}
          >
            See children
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Button
      borderRadius={6}
      borderWidth={1}
      borderColor={isSelected ? 'purple.900' : 'white'}
      bgColor={isSelected ? 'purple.900' : 'white'}
      textColor={isSelected ? 'white' : 'purple.900'}
      transition="border-color .35s"
      _hover={{
        borderColor: 'purple.900',
      }}
      onClick={() => handleSelectItem(data)}
    >
      {data.name}
    </Button>
  )
}
