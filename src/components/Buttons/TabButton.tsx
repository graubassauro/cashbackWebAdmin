import { Button, ButtonProps } from '@chakra-ui/react'

type TabButtonProps = ButtonProps & {
  title: string
  isActive?: boolean
}

export function TabButton({ title, isActive, ...rest }: TabButtonProps) {
  return (
    <Button
      bgColor="transparent"
      borderBottomWidth={1}
      borderBottomColor={isActive ? 'purple.900' : 'transparent'}
      borderRadius={0}
      transition={'ease-in 0.35s'}
      _hover={{
        bgColor: 'transparent',
        borderBottomColor: 'purple.900',
      }}
      {...rest}
    >
      {title}
    </Button>
  )
}
