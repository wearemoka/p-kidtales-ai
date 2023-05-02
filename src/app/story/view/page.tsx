'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Center, Heading, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()

  const title = globalStory.storyPaged[0].replace('Title: ', '')

  useEffect(() => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = 0
    setGlobalStory(tmpStory)
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
