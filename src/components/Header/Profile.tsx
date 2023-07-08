import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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

import { logout, useCurrentUserLogged } from '~redux/auth'

export function Profile() {
  const navigate = useNavigate()
  const user = useCurrentUserLogged()

  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logout())
    navigate('/')
  }, [dispatch, navigate])

  return (
    <HStack>
      <HStack>
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
            {user?.firstName ?? 'Un'}
          </Text>
        </HStack>
      </HStack>
      <Menu>
        <MenuButton>
          <Icon as={CaretDown} fontSize={16} color="gray.900" />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => navigate('/settings')}
            transition="ease-in-out 0.35s"
            _hover={{
              bgColor: 'purple.900',
              opacity: 0.9,
              textColor: 'white',
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            transition="ease-in-out 0.35s"
            _hover={{
              bgColor: 'purple.900',
              opacity: 0.9,
              textColor: 'white',
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            transition="ease-in-out 0.35s"
            _hover={{
              bgColor: 'purple.900',
              opacity: 0.9,
              textColor: 'white',
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}
