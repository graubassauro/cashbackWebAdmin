import {
  Badge,
  Card,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CaretRight, Question } from '@phosphor-icons/react'

export function FeedbackCard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  })

  return (
    <Card w="100%" p={6}>
      <Grid gap={2} templateColumns={['3fr 2fr 1fr']} alignItems="center">
        <Grid
          gap={2}
          templateColumns={['1fr', 'repeat(2, 1fr)']}
          alignItems="center"
        >
          <HStack>
            <Heading
              fontSize={24}
              fontWeight={700}
              color="gray.900"
              noOfLines={1}
            >
              David Lucas
            </Heading>
            {isWideVersion ? <Badge colorScheme="yellow">New</Badge> : null}
          </HStack>
          {isWideVersion ? (
            <Icon as={Question} w={8} h={8} color="gray.700" />
          ) : null}
        </Grid>
        <Grid gap={2} templateColumns={['2fr 1fr']} alignItems="center">
          {isWideVersion ? (
            <HStack>
              <VStack spacing={0} alignItems="flex-start">
                <Text
                  fontSize={10}
                  fontWeight={400}
                  fontFamily="body"
                  color="gray.600"
                >
                  Category
                </Text>
                <Heading
                  fontSize={16}
                  fontWeight={500}
                  fontFamily="heading"
                  color="gray.900"
                >
                  Clothes
                </Heading>
              </VStack>
              <VStack spacing={0} alignItems="flex-start">
                <Text
                  fontSize={10}
                  fontWeight={400}
                  fontFamily="body"
                  color="gray.600"
                >
                  City
                </Text>
                <Heading
                  fontSize={16}
                  fontWeight={500}
                  fontFamily="heading"
                  color="gray.900"
                >
                  Clothes
                </Heading>
              </VStack>
            </HStack>
          ) : null}
          <VStack spacing={0} alignItems="flex-start">
            <Text
              fontSize={10}
              fontWeight={400}
              fontFamily="body"
              color="gray.600"
            >
              Establishment
            </Text>
            <Heading
              fontSize={16}
              fontWeight={500}
              fontFamily="heading"
              color="gray.900"
            >
              Clothes
            </Heading>
          </VStack>
        </Grid>
        <Icon ml="auto" as={CaretRight} w={6} h={6} color="gray.700" />
      </Grid>
    </Card>
  )
}
