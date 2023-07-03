import { useCallback } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { VStack, HStack, Grid } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormButton } from '~components/Buttons'
import { LabelInput, LabelTextarea } from '~components/Forms/Inputs'
import { Container } from '~layouts/Container'
import { LightSelectInput } from '~components/Forms/Select'

const createStoreProductSchema = z.object({
  name: z.string(),
  brand: z.string(),
  about: z.string(),
  quantity: z.number(),
  price: z.number(),
  pointGain: z.string(),
  pointGainValue: z.number(),
  category: z.string(),
})

type CreateStoreProductInputs = z.infer<typeof createStoreProductSchema>

export function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateStoreProductInputs>({
    resolver: zodResolver(createStoreProductSchema),
    mode: 'onChange',
  })

  const handleCreateNewProduct = useCallback(
    (data: CreateStoreProductInputs) => {
      console.log(data)
    },
    [],
  )

  return (
    <Container hasGoBackButton title="New Product">
      <VStack
        as="form"
        w="100%"
        alignItems="flex-start"
        spacing={4}
        mt={4}
        onSubmit={handleSubmit(handleCreateNewProduct)}
      >
        <HStack w="100%" spacing={2}>
          <LabelInput
            label="Name"
            id="name"
            {...register('name')}
            error={errors.name}
          />
          <LabelInput
            label="Brand"
            id="brand"
            {...register('brand')}
            error={errors.brand}
          />
        </HStack>
        <LabelTextarea
          label="Description"
          id="about"
          {...register('about')}
          error={errors.about}
        />
        <HStack spacing={2} w="100%">
          <LabelInput
            label="Quantity"
            id="quantity"
            {...register('quantity')}
            error={errors.quantity}
          />
          <LabelInput
            label="Price"
            id="price"
            {...register('price')}
            error={errors.price}
          />
        </HStack>
        <Grid
          gap={2}
          w="100%"
          alignItems="center"
          templateColumns={['1fr', '4fr 1fr']}
        >
          <LightSelectInput label="Point gain option" />
          <LabelInput
            label="Value"
            id="pointGainValue"
            {...register('pointGainValue')}
            error={errors.pointGainValue}
          />
        </Grid>
        <FormButton
          type="submit"
          title="Create"
          alignSelf="flex-end"
          formButtonType="SUBMIT"
          isLoading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </VStack>
    </Container>
  )
}
