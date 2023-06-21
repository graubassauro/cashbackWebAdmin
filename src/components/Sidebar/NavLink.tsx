import { ElementType } from 'react'
import { NavLink as RRLink } from 'react-router-dom'
import { Icon, Link, LinkProps, Text } from '@chakra-ui/react'

interface NavLinkProps extends LinkProps {
  icon: ElementType
  children: string
  hrefString: string
}

export function NavLink({ icon, children, hrefString, ...rest }: NavLinkProps) {
  return (
    <Link
      as={RRLink}
      to={hrefString}
      _activeLink={{
        color: 'blue.900',
      }}
      display="flex"
      alignItems="center"
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}
