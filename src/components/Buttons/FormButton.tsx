import { Button, ButtonProps } from '@chakra-ui/react'

interface FormButtonProps extends ButtonProps {
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
      fontSize={18}
      borderColor="purple.900"
      bgColor={formButtonType === 'CANCEL' ? 'transparent' : 'purple.900'}
      variant={formButtonType === 'CANCEL' ? 'outline' : 'solid'}
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
