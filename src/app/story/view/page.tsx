'use client'
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Center, VStack } from '@chakra-ui/react'

function viewPage () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { globalStory } = useGlobalContext()

  const title = globalStory.storyPaged[0].replace('Title: ', '')
  const story = globalStory.storyPaged.slice(1)

  return (
    <Center>
      <VStack>

        <StoryPagination title={title} story={story} />

      </VStack>
    </Center>
  )
}

export default viewPage
