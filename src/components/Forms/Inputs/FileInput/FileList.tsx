import { Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Grid,
  HStack,
  Icon,
  IconButton,
  // Progress,
  Text,
  VStack,
} from '@chakra-ui/react'

import { useFileInputContext } from '~contexts/FileListInputContext'
import { formatBytes } from '~utils/formatBytes'

export function FileList() {
  const { files, onFileUnSelect } = useFileInputContext()

  return (
    <Grid
      gap={2}
      w="100%"
      alignItems="center"
      justifyContent="center"
      templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
    >
      <AnimatePresence mode="sync">
        {files.map((file) => {
          return (
            <motion.div
              key={file.name}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
            >
              <VStack
                flex={1}
                minW="100%"
                h={['6.875rem']}
                gap={4}
                p={4}
                alignItems="flex-start"
                borderRadius="lg"
                borderWidth={1}
                borderColor="gray.400"
                bgColor="gray.300"
              >
                <HStack
                  w="100%"
                  flex={1}
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <VStack alignItems="flex-start">
                    <Text
                      as="span"
                      fontSize={16}
                      fontWeight={500}
                      color="gray.800"
                      noOfLines={1}
                    >
                      {file.name}
                    </Text>
                    <Text
                      as="span"
                      fontSize={16}
                      fontWeight={400}
                      color="gray.700"
                    >
                      {formatBytes(file.size)}
                    </Text>
                  </VStack>
                  <IconButton
                    aria-label="Remove"
                    w={6}
                    h={6}
                    bgColor="transparent"
                    color="purple.900"
                    icon={<Icon as={Trash2} />}
                    transition="ease-in 0.35s"
                    onClick={() => onFileUnSelect(file.name, true)}
                    _hover={{
                      bgColor: 'purple.900',
                      color: 'white',
                      svg: {
                        fill: {
                          stroke: 'white',
                        },
                      },
                    }}
                  />
                </HStack>
                {/* <Progress
                  w="100%"
                  size="md"
                  value={80}
                  borderRadius="md"
                  colorScheme="purple"
                /> */}
              </VStack>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </Grid>
  )
}
