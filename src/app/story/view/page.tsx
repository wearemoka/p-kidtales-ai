'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Center, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = 1
    setGlobalStory(tmpStory)

    const story = globalStory.storyPaged || null
    if (story && story.length > 0) {
      const cleanTitle = story[0].replace('Title: ', '')
      setTitle(cleanTitle)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Center>
      <VStack>

        <Heading>{title}</Heading>
        <StoryPagination />

      </VStack>
    </Center>
  )
}

export default viewPage
