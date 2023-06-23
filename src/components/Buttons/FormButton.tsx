import { Button, ButtonProps } from '@chakra-ui/react'

type FormButtonProps = ButtonProps & {
  title: string
  formButtonType: 'SUBMIT' | 'CANCEL'
}

export function FormButton({
  title,
  formButtonType = 'SUBMIT',
  ...rest
}: FormButtonProps) {
  return (
    <Button
      h={12}
      px={10}
      borderWidth={1}
      borderColor="purple.900"
      bgColor={formButtonType === 'CANCEL' ? 'transparent' : 'purple.900'}
      variant={formButtonType === 'CANCEL' ? 'outline' : 'solid'}
      fontSize={18}
      textColor={formButtonType === 'CANCEL' ? 'purple.900' : 'white'}
      _hover={{
        bgColor: formButtonType === 'CANCEL' ? 'transparent' : 'purple.900',
        textColor: formButtonType === 'CANCEL' ? 'purple.900' : 'white',
        opacity: 0.75,
      }}
      {...rest}
    >
      {title}
    </Button>
  )
}
