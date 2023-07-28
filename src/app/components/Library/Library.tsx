'use client'

import { useGlobalContext } from '@/app/context/store'
import { paginateStory } from '@/app/utils/helper'
import { ROUTES } from '@/app/utils/routes'
import { Box, Button, Heading, SimpleGrid, Stack, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './Library.module.scss'
import Slider from 'react-slick'

const MIN_ITEMS_TO_DISPLAY = 6

interface Props {
    age:string,
    stories: any,
    isLargerThan990: boolean,
    loading: boolean
}

function Stories ({ age, isLargerThan990, stories, loading }:Props) {
  const router = useRouter()
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(MIN_ITEMS_TO_DISPLAY)
  let totalItemsToDisplay = 0

  let mappedDataByAge:any = []
  let toDisplay = []

  if (stories) {
    mappedDataByAge = stories?.filter((item: any) => {
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
    slidesToShow: 2.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    initialSlide: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }

  return (
    <>
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
                  <Image src='images/librarybg.png' alt='' />
                  <Text className='lead'>{item.title}</Text>
                </Box>
              )
            })}
          </SimpleGrid>

          {(itemsToDisplay <= MIN_ITEMS_TO_DISPLAY && totalItemsToDisplay > MIN_ITEMS_TO_DISPLAY) &&
            <div>
              <Button
                onClick={() => {
                  setItemsToDisplay(stories.length)
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
                <Image src='images/librarybg.png' alt='' />
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
