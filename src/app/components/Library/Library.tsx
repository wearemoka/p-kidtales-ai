'use client'

import { useGlobalContext } from '@/app/context/store'
import { useFetchStory } from '@/app/hooks/useFetchStory'
import { ROUTES } from '@/app/utils/routes'
import { Box, Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

interface Props {
    age:string
}

function Stories ({ age }:Props) {
  const router = useRouter()
  const { globalStory, setGlobalStory } = useGlobalContext()
  const { data } = useFetchStory(fireBaseStoryCollection) // get stories from the repository
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(8)

  const mappedDataByAge:any = data?.filter((item: any) => item.prompt.includes(age))
  const toDisplay = mappedDataByAge.slice(0, itemsToDisplay)

  /**
   * Save the story in the corresponding context
   * Navigate to the page to view the story
   */
  const openStoryHandler = (story: any) => {
    const storyToLoad = { ...globalStory }

    storyToLoad.story = story
    storyToLoad.currentPage = 1
    storyToLoad.storyPaged = story.story.split('\n\n').filter((value: string) => value !== '')

    setGlobalStory(storyToLoad)
    router.push(ROUTES.STORY_VIEW)
  }

  return (
    <VStack>
      <h4> For {age} years old kids </h4>

      <SimpleGrid columns={2} spacing={10}>
        {toDisplay && toDisplay.map((item: any, index: number) => {
          return (
            <Box
              key={index}
              onClick={() => { openStoryHandler(item) }}
              cursor='pointer'
              borderWidth='1px'
              borderRadius='lg'
            >
              {item.title}
            </Box>
          )
        })}
      </SimpleGrid>

      <Button
        onClick={() => {
          setItemsToDisplay(data.length)
        }}
        variant='link'
      >
        View All
      </Button>
    </VStack>
  )
}

export default Stories
