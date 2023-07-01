import { ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Icon } from '@chakra-ui/react'

import { Title } from '~components/Typograph/Title'
import { ArrowLeft } from '@phosphor-icons/react'

type ContainerProps = {
  title?: string
  hasGoBackButton?: boolean
  children: ReactNode
}

export function Container({
  title = '',
  hasGoBackButton = false,
  children,
}: ContainerProps) {
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <Box
      alignItems="flex-start"
      w="100%"
      mt="4"
      px="4"
      py="5"
      bgColor="white"
      borderRadius={10}
      maxW={1480}
    >
      {title ? (
        <Flex
          borderBottomWidth={1}
          borderBottomColor="gray.300"
          pb={2}
          justifyContent={hasGoBackButton ? 'space-between' : 'flex-start'}
        >
          {hasGoBackButton && (
            <Icon
              as={ArrowLeft}
              w={8}
              h={8}
              borderRadius={6}
              color="gray.700"
              transition="ease-in 0.35s"
              _hover={{
                bgColor: 'gray.700',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={handleGoBack}
            />
          )}
          <Title title={title} />
        </Flex>
      ) : null}
      {children}
    </Box>
  )
}
