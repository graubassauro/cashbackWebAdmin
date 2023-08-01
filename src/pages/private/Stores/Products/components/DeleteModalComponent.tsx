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

type DeleteModalComponentProps = {
  isOpen: boolean
  isDeleting: boolean
  onClose: () => void
  onHandleDeleteProductByProductUid: () => void
}

export function DeleteModalComponent({
  isOpen,
  isDeleting,
  onClose,
  onHandleDeleteProductByProductUid,
}: DeleteModalComponentProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="heading" fontSize={24} fontWeight="bold">
          Are you sure?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontFamily="body" fontSize={16} fontWeight="regular">
            It seems that you want to delete the produc. Doing this, you will
            delete all informations related to the product including its
            hightlights
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
              bgColor: 'white',
              borderColor: 'purple.900',
              textColor: 'purple.900',
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
            isLoading={isDeleting}
            _hover={{
              filter: 'brightness(1.2)',
            }}
            onClick={onHandleDeleteProductByProductUid}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
