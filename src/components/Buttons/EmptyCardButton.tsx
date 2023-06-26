import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { Plus } from '@phosphor-icons/react'

type EmptyCardButtonProps = ButtonProps

export function EmptyCardButton({ ...rest }: EmptyCardButtonProps) {
  return (
    <Button
      w="100%"
      h="17rem"
      p={4}
      alignItems="center"
      justifyContent="center"
      bgColor="white"
      borderWidth={1}
      borderColor="yellow.700"
      borderStyle="dashed"
      _hover={{
        bgColor: 'white',
        opacity: 0.8,
      }}
      {...rest}
    >
      <Icon as={Plus} color="yellow.700" />
    </Button>
  )
}
