import {
  Avatar,
  AvatarBadge,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { CaretDown } from '@phosphor-icons/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <HStack>
      <HStack>
        {showProfileData ? (
          <HStack>
            <Avatar
              src="https://github.com/thereallucas98.png"
              h="2rem"
              w="2rem"
              borderWidth={1}
              borderColor="purple.900"
            >
              <AvatarBadge boxSize="1rem" bg="purple.900" />
            </Avatar>
            <Text fontSize={14} fontWeight={400} color="gray.900">
              David Lucas
            </Text>
          </HStack>
        ) : null}
      </HStack>
      <Menu>
        <MenuButton>
          <Icon as={CaretDown} fontSize={16} color="gray.900" />
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}
