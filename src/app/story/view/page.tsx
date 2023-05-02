'use client'
import { useGlobalContext } from '@/app/context/store'
import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react'

function viewPage () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { globalStory } = useGlobalContext()

  const title = globalStory.storyPaged[0].replace('Title: ', '')
  const maxPages = globalStory.storyPaged.length

  return (
    <Center>
      <VStack>

        <Heading>{title}</Heading>

        <Text>
          {globalStory.storyPaged[1]}
        </Text>

        <div>
          paginas {globalStory.storyPage} / {maxPages}
        </div>
        <Button>Play</Button>
      </VStack>
    </Center>
  )
}

export default viewPage
