import { Button, ButtonProps } from '@chakra-ui/react'

interface ButtonComponentProps extends ButtonProps {
  title: string
}

export function ButtonComponent({ title, ...rest }: ButtonComponentProps) {
  return (
    <Button
      h={[10, 12, 14]}
      p={[6, 8]}
      w="100%"
      bgColor="yellow.700"
      textColor="white"
      fontSize="1rem"
      fontFamily="heading"
      _hover={{
        opacity: 0.75,
      }}
      {...rest}
    >
      {title}
    </Button>
  )
}
