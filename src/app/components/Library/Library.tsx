'use client'

import { useGlobalContext } from '@/app/context/store'
import { useFetchStory } from '@/app/hooks/useFetchStory'
import { paginateStory } from '@/app/utils/helper'
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

  let mappedDataByAge:any = []
  let toDisplay = []

  if (data) {
    mappedDataByAge = data?.filter((item: any) => {
      if (Array.isArray(item.prompt)) {
        return item.prompt.includes(age)
      } else {
        return false
      }
    })
    toDisplay = mappedDataByAge.slice(0, itemsToDisplay)
  }

  /**
   * Save the story in the corresponding context
   * Navigate to the page to view the story
   */
  const openStoryHandler = (story: any) => {
    const storyToLoad = { ...globalStory }

    storyToLoad.story = story.story
    storyToLoad.currentPage = 1
    storyToLoad.storyPaged = paginateStory(story.story)

    setGlobalStory(storyToLoad)
    router.push(ROUTES.STORY_VIEW)
  }

  return (
    <>
      {itemsToDisplay &&
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

          {(itemsToDisplay <= 8) &&
            <Button
              onClick={() => {
                setItemsToDisplay(data.length)
              }}
              variant='link'
            >
              View All
            </Button>}
        </VStack>}
    </>
  )
}

export default Stories
