import { Box, Icon, Image } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useCallback } from 'react'

type ImageData = {
  imageUId: string
  url: string
}

type ImagePreviewProps = {
  data: ImageData
  onHandleDelete: (imageUid: string) => void
}

export function ImagePreview({ data, onHandleDelete }: ImagePreviewProps) {
  // const { files } = useFileInputContext()

  const handleDeleteImage = useCallback(() => {
    onHandleDelete(data.imageUId)
  }, [data.imageUId, onHandleDelete])

  // const previewURL = useMemo(() => {
  //   if (files.length === 0) {
  //     return null
  //   }

  //   return URL.createObjectURL(files[0])
  // }, [files])

  // if (previewURL === null) {
  //   return (
  //     <Stack>
  //       <User />
  //     </Stack>
  //   )
  // }

  return (
    <Box position="relative">
      <Image
        alt=""
        src={data.url}
        h={32}
        w={32}
        borderRadius="full"
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Icon
        as={X}
        size={24}
        color="yellow.700"
        position="absolute"
        bgColor="gray.400"
        w="2.5rem"
        h="2rem"
        borderTopLeftRadius={0}
        borderTopRightRadius="1rem"
        borderBottomLeftRadius="1rem"
        top={-0.5}
        right={-0.3}
        onClick={handleDeleteImage}
        _hover={{
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}
