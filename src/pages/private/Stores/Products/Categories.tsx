import { Grid, HStack } from '@chakra-ui/react'

import { BreadCrumb } from '~components/Breadcrumb'
import { CategoryCard } from '../components/CategoryCard'
import { Loading } from '~components/Loading'
import { BodyLayout } from '~layouts/Body'
import { useGetAllCategoriesQuery } from '~services/category.service'

export function Categories() {
  const {
    data: categories,
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useGetAllCategoriesQuery()

  return (
    <BodyLayout>
      <HStack justifyContent="flex-start">
        <BreadCrumb />
      </HStack>
      {isFetchingCategories || isLoadingCategories ? (
        <Loading />
      ) : (
        <Grid templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={2} mt={8}>
          {categories?.data.map((category) => (
            <CategoryCard key={category.id} data={category} />
          ))}
        </Grid>
      )}
    </BodyLayout>
  )
}
