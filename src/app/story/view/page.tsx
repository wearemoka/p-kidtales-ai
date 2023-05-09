'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Heading, Container, GridItem, Grid, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import styles from './tale.module.scss'

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
    <div className={styles.tale}>
      <div className={styles.image}>
        <Image src='images/characters/whale.png' alt='' />
      </div>
      <Container>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colSpan={{ lg: 3, md: 1, base: 0 }} />
          <GridItem colSpan={{ lg: 6, md: 10, base: 12 }}>

            <Heading as='h1' className='heading-small' mb={3}>{title}</Heading>
            <StoryPagination />

          </GridItem>
          <GridItem colSpan={{ lg: 3, md: 1, base: 0 }} />
        </Grid>
      </Container>
    </div>
  )
}

export default viewPage
