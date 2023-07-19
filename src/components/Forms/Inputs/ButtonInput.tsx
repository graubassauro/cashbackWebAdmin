import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import {
  Button,
  FormControl,
  Text,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { List } from '@phosphor-icons/react'

interface ButtonInputProps {
  error?: FieldError
  label: string
  title: string
  isLoading: boolean
  modalButton: 'brand' | 'category'
  hasSelectedItems?: boolean
  onHandleOpenCorrectModal: (type: 'brand' | 'category') => void
  onHandleOpenCorrectUnselectModal: () => void
}

/**
 * Product price %
 * fixed points
 */

const ButtonInputBase: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonInputProps
> = (
  {
    label,
    title,
    modalButton = 'category',
    error,
    isLoading,
    hasSelectedItems = false,
    onHandleOpenCorrectModal,
    onHandleOpenCorrectUnselectModal,
    // ...rest
  },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <VStack spacing={1} alignItems="flex-start" w="100%">
        <Text
          as="span"
          fontSize={14}
          fontWeight={400}
          fontFamily="body"
          color="gray.600"
        >
          {label}
        </Text>
        <HStack w="100%">
          <Button
            w="100%"
            h={14}
            color="gray.800"
            borderRadius="10"
            borderWidth={1}
            borderColor="gray.600"
            bgColor="gray.400"
            variant="unstyled"
            alignItems="center"
            justifyContent="center"
            py={2}
            onClick={() => onHandleOpenCorrectModal(modalButton)}
            ref={ref}
            isLoading={isLoading}
          >
            {title}
          </Button>
          {hasSelectedItems ? (
            <Icon
              as={List}
              w={14}
              h={14}
              p={4}
              borderRadius="10"
              color="gray.800"
              bgColor="gray.400"
              borderWidth={1}
              borderColor="gray.600"
              size={18}
              onClick={onHandleOpenCorrectUnselectModal}
              _hover={{
                cursor: 'pointer',
              }}
            />
          ) : null}
        </HStack>
      </VStack>
    </FormControl>
  )
}

export const ButtonInput = forwardRef(ButtonInputBase)
