'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Center, Heading, VStack, Container, GridItem, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = 0
    setGlobalStory(tmpStory)

    const story = globalStory.storyPaged || null
    if (story && story.length > 0) {
      const cleanTitle = story[0].replace('Title: ', '')
      setTitle(cleanTitle)
    }
  }, [])

  return (
    <Container>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        <GridItem colSpan={{ lg: 3, md: 1, base: 0 }} />
        <GridItem colSpan={{ lg: 6, md: 10, base: 12 }}>

          <Heading>{title}</Heading>
          <StoryPagination />

        </GridItem>
        <GridItem colSpan={{ lg: 3, md: 1, base: 0 }} />
      </Grid>
    </Container>
  )
}

export default viewPage
