import { Card, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { TrendDown, TrendUp } from '@phosphor-icons/react'

import { formatCurrency } from '~utils/formatCurrency'

type OverviewCardProps = {
  title: string
  amount: number
  percentageIncrease?: boolean
  percentage: number
  type: 'SALES' | 'TRANSACTIONS' | 'AVERAGE'
}

export function OverviewCard({
  title,
  amount,
  percentageIncrease = false,
  percentage,
  type = 'SALES',
}: OverviewCardProps) {
  const amountFormatted = formatCurrency(amount, 'en-US', 'usd')

  return (
    <Card
      gridArea={type}
      w="100%"
      h={110}
      p={4}
      bgColor={type === 'SALES' ? 'purple.900' : 'yellow.700'}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize={24} fontWeight={700} color="gray.300">
            {title}
          </Text>
          <Heading fontSize={32} fontWeight={700} color="gray.300">
            {amountFormatted}
          </Heading>
        </VStack>
        <HStack alignItems="center">
          <Icon
            as={percentageIncrease ? TrendUp : TrendDown}
            color="gray.300"
            size={18}
          />
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize={14} fontWeight={700} color="gray.300">
              {percentage}%
            </Text>
            <Text fontSize={14} fontWeight={700} color="gray.300">
              from last month
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}
