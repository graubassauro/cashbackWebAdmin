import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import { PaginationItem } from './Pagination/PaginationItem'
import { useMemo } from 'react'

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

type TableFooterProps = {
  currentPage: number
  currentPageEndAmount: number
  currentPageTotalItems: number
  totalItems: number
  isWideVersion?: boolean
  onPageChange: (page: number) => void
}

export function TableFooter({
  currentPage,
  currentPageEndAmount,
  currentPageTotalItems,
  totalItems,
  isWideVersion = false,
  onPageChange,
}: TableFooterProps) {
  const lastPage = useMemo(
    () => Math.floor(totalItems / currentPageTotalItems),
    [totalItems, currentPageTotalItems],
  )

  const previousPages = useMemo(
    () =>
      currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : [],
    [currentPage],
  )

  const nextPages = useMemo(
    () =>
      currentPage < lastPage
        ? generatePagesArray(
            currentPage,
            Math.min(currentPage + siblingsCount, lastPage),
          )
        : [],
    [currentPage, lastPage],
  )

  return (
    <HStack
      as="label"
      spacing={2}
      justifyContent={
        isWideVersion && currentPageEndAmount > 1 ? 'space-between' : 'center'
      }
      alignItems="center"
    >
      {isWideVersion ? (
        <Text fontSize={14} fontWeight={700} color="gray.600">
          Showing {currentPageTotalItems} of {totalItems} items
        </Text>
      ) : null}
      {currentPageEndAmount > 1 ? (
        <Stack
          direction={['column', 'row']}
          mt="8"
          justify="space-between"
          align="center"
          spacing="6"
        >
          <HStack spacing={0}>
            {currentPage > 1 ? (
              <Button
                bgColor="transparent"
                p={0}
                borderWidth={1}
                borderColor="white"
                transition="ease-in 0.35s"
                _hover={{ bgColor: 'white', borderColor: 'gray.400' }}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <CaretLeft size={24} />
              </Button>
            ) : null}
            <Stack direction="row" spacing="2">
              {previousPages.length > 0 &&
                previousPages.map((page) => {
                  return (
                    <PaginationItem
                      onPageChange={onPageChange}
                      key={page}
                      number={page}
                    />
                  )
                })}
              <PaginationItem
                onPageChange={onPageChange}
                number={currentPage}
                isCurrent
              />

              {nextPages.length > 0 &&
                nextPages.map((page) => {
                  return (
                    <PaginationItem
                      onPageChange={onPageChange}
                      key={page}
                      number={page}
                    />
                  )
                })}
              {currentPage + siblingsCount < lastPage && (
                <>
                  {currentPage + 1 + siblingsCount < lastPage && (
                    <Text
                      bgColor="gray.900"
                      color="white"
                      w="8"
                      borderRadius="md"
                      textAlign="center"
                    >
                      ...
                    </Text>
                  )}
                  <PaginationItem
                    onPageChange={onPageChange}
                    number={lastPage}
                  />
                </>
              )}
            </Stack>
            {currentPage < currentPageEndAmount ? (
              <Button
                bgColor="transparent"
                p={0}
                borderWidth={1}
                borderColor="white"
                transition="ease-in 0.35s"
                _hover={{ bgColor: 'white', borderColor: 'gray.400' }}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <CaretRight size={24} />
              </Button>
            ) : null}
          </HStack>
        </Stack>
      ) : null}
    </HStack>
  )
}
