import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

interface DeletePromoModalProps {
  promoName: string
  isDeleting: boolean
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeletePromoModal({
  promoName,
  isOpen,
  isDeleting,
  onClose,
  onDelete,
}: DeletePromoModalProps) {
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
            All products vinculated to this promotion will lose its promo price.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            borderWidth={1}
            borderRadius={6}
            bgColor="purple.900"
            textColor="white"
            mr={3}
            onClick={onClose}
            _hover={{
              opacity: 0.8,
            }}
          >
            Cancel
          </Button>
          <Button
            borderWidth={1}
            borderRadius={6}
            bgColor="white"
            borderColor="purple.900"
            textColor="purple.900"
            mr={3}
            onClick={onDelete}
            isLoading={isDeleting}
            _hover={{
              opacity: 0.75,
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
