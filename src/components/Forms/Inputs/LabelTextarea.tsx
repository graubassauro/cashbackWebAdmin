import {
  FormControl,
  Text,
  Textarea,
  TextareaProps,
  VStack,
} from '@chakra-ui/react'
import { ForwardRefRenderFunction, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type LabelTextAreaProps = TextareaProps & {
  label: string
  error?: FieldError
}

const LabelTextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  LabelTextAreaProps
> = ({ label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <VStack as="label" spacing={1} alignItems="flex-start" w="100%">
        <Text fontSize={14} fontWeight={400} fontFamily="body" color="gray.600">
          {label}
        </Text>
        <Textarea
          w="100%"
          h={12}
          color="gray.800"
          borderRadius="10"
          borderWidth={1}
          borderColor="gray.600"
          bgColor="gray.400"
          variant="unstyled"
          px="4"
          mr="4"
          maxHeight={100}
          ref={ref}
          {...rest}
        />
      </VStack>
    </FormControl>
  )
}

export const LabelTextarea = forwardRef(LabelTextAreaBase)
