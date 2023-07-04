'use client'

import { useGlobalContext } from '@/app/context/store'
import { useFetchStory } from '@/app/hooks/useFetchStory'
import { paginateStory } from '@/app/utils/helper'
import { ROUTES } from '@/app/utils/routes'
import { Box, Button, Heading, SimpleGrid, Stack, Image, Text, useMediaQuery } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './Library.module.scss'
import Slider from 'react-slick'
import LoadingSkeleton from './LoadingSkeleton'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
const MIN_ITEMS_TO_DISPLAY = 6

interface Props {
    age:string
}

function Stories ({ age }:Props) {
  const router = useRouter()
  const { globalStory, setGlobalStory } = useGlobalContext()
  const { data, loading } = useFetchStory(fireBaseStoryCollection) // get stories from the repository
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(MIN_ITEMS_TO_DISPLAY)
  let totalItemsToDisplay = 0

  let mappedDataByAge:any = []
  let toDisplay = []

  const [isLargerThan990] = useMediaQuery('(min-width: 990px)')

  if (data) {
    mappedDataByAge = data?.filter((item: any) => {
      if (item.appropriate !== false && Array.isArray(item.prompt)) {
        return item.prompt.includes(age)
      } else {
        return false
      }
    })
    totalItemsToDisplay = mappedDataByAge.length

    if (isLargerThan990) {
      toDisplay = mappedDataByAge.slice(0, itemsToDisplay)
    } else {
      toDisplay = mappedDataByAge.slice(0)
    }
  }

  /**
   * Save the story in the corresponding context
   * Navigate to the page to view the story
   */
  const openStoryHandler = (story: any) => {
    const storyToLoad = { ...globalStory }

    storyToLoad.story = story
    storyToLoad.currentPage = 1
    storyToLoad.storyPaged = paginateStory(story.story)

    setGlobalStory(storyToLoad)
    router.push(ROUTES.STORY_VIEW)
  }

  const settings = {
    dots: false,
    speed: 500,
    swipeToSlide: true,
    arrows: false,
    infinite: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <>
      {loading && <LoadingSkeleton isGrid={isLargerThan990} />}

      {itemsToDisplay && isLargerThan990 &&
        <Stack direction='column' justify='start' spacing='20px' mt={3} mb={10}>
          <Heading as='h2' className='lead text-secondary'> For {age} years old kids </Heading>
          {/* Error - no stories */}
          {!loading && totalItemsToDisplay === 0 && <Text>No stories found for {age} years old kids</Text>}

          <SimpleGrid columns={3} spacing={5}>
            {toDisplay && toDisplay.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  onClick={() => { openStoryHandler(item) }}
                  borderRadius='lg'
                  className={styles.libraryItem}
                >
                  <Image src='images/Loading.png' alt='' />
                  <Text className='body'>{item.title}</Text>
                </Box>
              )
            })}
          </SimpleGrid>

          {(itemsToDisplay <= MIN_ITEMS_TO_DISPLAY && totalItemsToDisplay > MIN_ITEMS_TO_DISPLAY) &&
            <div>
              <Button
                onClick={() => {
                  setItemsToDisplay(data.length)
                }}
                variant='link'
                className='button-link'
              >
                View All
              </Button>
            </div>}
        </Stack>}

      {itemsToDisplay && !isLargerThan990 &&
        <Box mt={3}>
          <Heading as='h2' className='lead text-secondary' mb={2}> For {age} years old kids </Heading>
          <Slider {...settings} className='library'>
            {toDisplay && toDisplay.map((item: any, index: number) =>
              <Box
                key={index}
                onClick={() => { openStoryHandler(item) }}
                borderRadius='lg'
                className={styles.libraryItem}
              >
                <Image src='images/Loading.png' alt='' />
                <Text className='body'>{item.title}</Text>
              </Box>)}
          </Slider>
          {/* Error - no stories */}
          {!loading && totalItemsToDisplay === 0 && <Text>No stories found for {age} years old kids</Text>}
        </Box>}
    </>
  )
}

export default Stories
