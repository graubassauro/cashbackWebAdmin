import { Grid, HStack } from '@chakra-ui/react'

import { BreadCrumb } from '~components/Breadcrumb'
import { ActionButton, EmptyCardButton } from '~components/Buttons'
import { BodyLayout } from '~layouts/Body'

export function Categories() {
  return (
    <BodyLayout>
      <HStack justifyContent="space-between">
        <BreadCrumb />
        <ActionButton title="New Segment" />
      </HStack>
      <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap={2} mt={8}>
        <EmptyCardButton />
        <EmptyCardButton />
        <EmptyCardButton />
        <EmptyCardButton />
      </Grid>
    </BodyLayout>
  )
}
