import { Heading, HeadingProps } from '@chakra-ui/react'

type TitleProps = HeadingProps & {
  title: string
}

export function Title({ title, ...rest }: TitleProps) {
  return (
    <Heading fontFamily="heading" fontSize={32} fontWeight="bold" {...rest}>
      {title}
    </Heading>
  )
}
