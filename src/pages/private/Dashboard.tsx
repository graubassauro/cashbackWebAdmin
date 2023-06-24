import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ActionButton } from '~components/Buttons'

import { OverviewCard } from '~components/OverviewCard'
import { BodyLayout } from '~layouts/Body'

export function Dashboard() {
  return (
    <BodyLayout>
      <HStack justifyContent="space-between">
        <Heading fontSize={32} fontWeight={700} color="gray.900">
          Overview
        </Heading>
        <ActionButton title="Filter" />
      </HStack>
      <Flex
        mt={8}
        w="100%"
        gap={2}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <OverviewCard
          title="Sales"
          amount={190340}
          percentage={45.5}
          percentageIncrease
          type="SALES"
        />
        <OverviewCard
          title="Transactions"
          amount={669}
          percentage={45.5}
          percentageIncrease
          type="OTHERS"
        />
        <OverviewCard
          title="Average Ticket"
          amount={4009}
          percentage={45.5}
          percentageIncrease
          type="OTHERS"
        />
      </Flex>
      <Box w="100%" bgColor="white" px={2} py={4} mt={4} borderRadius={10}>
        <HStack justifyContent="space-between" spacing={2}>
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize={24} fontWeight={400} color="gray.700">
              Statistics
            </Text>
            <Heading fontSize={24} fontWeight={700} color="gray.700">
              Sales review and forecast
            </Heading>
          </VStack>
          <Button
            bgColor="white"
            borderColor="gray.700"
            borderWidth={1}
            borderRadius={8}
            px={6}
            py={2}
            fontSize={16}
            fontWeight={400}
            textColor="gray.700"
            transition="ease-in 0.35s"
            _hover={{
              bgColor: 'gray.700',
              textColor: 'white',
              opacity: 0.8,
            }}
          >
            Jan, 2023 - June, 2023
          </Button>
        </HStack>
      </Box>
    </BodyLayout>
  )
}
