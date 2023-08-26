import { Box } from '@chakra-ui/react'

interface BulletProps {
  isActive: boolean
}

export function Bullet({ isActive = false }: BulletProps) {
  return (
    <Box
      w={3}
      h={3}
      bg={isActive ? 'purple.900' : 'gray.700'}
      borderRadius="full"
    />
  )
}
