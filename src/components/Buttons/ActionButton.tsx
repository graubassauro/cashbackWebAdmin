import { Button, ButtonProps } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

type ActionButtonProps = ButtonProps & {
  title: string
  linkingButton?: boolean
  endpointString?: string
}

export function ActionButton({
  title,
  linkingButton = false,
  endpointString = '',
  ...rest
}: ActionButtonProps) {
  if (linkingButton) {
    return (
      <NavLink to={endpointString}>
        <Button
          bgColor="white"
          borderColor="gray.700"
          borderWidth={1}
          borderRadius={8}
          px={8}
          py={2}
          fontSize={16}
          fontWeight={400}
          textColor="gray.700"
          transition="ease-in 0.35s"
          _hover={{
            bgColor: 'gray.700',
            textColor: 'white',
            opacity: 0.8,
          }}
          {...rest}
        >
          {title}
        </Button>
      </NavLink>
    )
  }

  return (
    <Button
      bgColor="white"
      borderColor="gray.700"
      borderWidth={1}
      borderRadius={8}
      px={8}
      py={2}
      fontSize={16}
      fontWeight={400}
      textColor="gray.700"
      transition="ease-in 0.35s"
      _hover={{
        bgColor: 'gray.700',
        textColor: 'white',
        opacity: 0.8,
      }}
      {...rest}
    >
      {title}
    </Button>
  )
}
