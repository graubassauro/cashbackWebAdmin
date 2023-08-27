import {
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

import { PromotionProduct } from '~models/Promotion'

interface ShowProductsModalProps {
  promoName: string
  data: PromotionProduct[]
  isOpen: boolean
  onClose: () => void
}

export function ShowProductsModal({
  promoName,
  data,
  isOpen,
  onClose,
}: ShowProductsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
          {promoName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontFamily="body" fontSize={16} fontWeight="regular">
            All products vinculated to this promotion
          </Text>
          <VStack pt={4}>
            {data.map((p) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                spacing={2}
                key={p.name}
                borderBottomWidth={1}
                borderBottomColor="gray.400"
                pb={4}
              >
                <VStack alignItems="flex-start">
                  <Text fontSize={14} fontWeight={700} color="gray.800">
                    {p.name}
                  </Text>
                  <Text fontSize={20} color="purple.900" fontWeight={500}>
                    ${p.promotionPriceOff}
                  </Text>
                </VStack>
                <HStack>
                  {p.images &&
                    p?.images.map((i) => (
                      <Image
                        key={i.productImageUId}
                        src={i.url}
                        alt={i.productImageUId}
                        w={10}
                        h={10}
                        borderRadius="full"
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    ))}
                </HStack>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
