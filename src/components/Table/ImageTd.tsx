import { Image, ImageProps, Td } from '@chakra-ui/react'

type ImageTdProps = ImageProps & {
  product: string
}

export function ImageTd({ product, ...rest }: ImageTdProps) {
  return (
    <Td>
      <Image
        h={14}
        w={14}
        borderRadius="lg"
        fallbackSrc="https://via.placeholder.com/150"
        alt={product}
        {...rest}
      />
    </Td>
  )
}
