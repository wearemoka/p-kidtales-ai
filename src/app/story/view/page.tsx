'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import { useGlobalContext } from '@/app/context/store'
import { Center, Heading, VStack, Container, GridItem, Grid, Heading, Container, GridItem, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = 1
    setGlobalStory(tmpStory)

    const story = globalStory.storyPaged || null
    if (story && story.length > 0) {
      const cleanTitle = story[0].replace('Title: ', '')
      setTitle(cleanTitle)
    } else {
      // No story to display
      router.replace('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
