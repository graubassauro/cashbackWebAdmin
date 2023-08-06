import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { HStack, Icon } from '@chakra-ui/react'
import { ArrowLeft } from '@phosphor-icons/react'

import { Title } from '~components/Typograph/Title'

type HeaderFormProps = {
  title: string
}

export function HeaderForm({ title }: HeaderFormProps) {
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return (
    <HStack w="100%" justifyContent="space-between">
      <Icon
        as={ArrowLeft}
        w={6}
        h={6}
        borderRadius={3}
        color="gray.700"
        transition="ease-in 0.35s"
        _hover={{
          bgColor: 'gray.700',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={handleGoBack}
      />

      <Title title={title} />
    </HStack>
  )
}
