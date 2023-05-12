'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/app/context/store'
import { Heading, Container, GridItem, Grid, Image, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import styles from './tale.module.scss'
import Steps from '@/app/components/Steps/Steps'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const pages = globalStory.storyPaged.length

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

  const setCurrentStoryPage = (page: number) => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = page
    setGlobalStory(tmpStory)
  }

  const handleNextPage = () => {
    if (globalStory.currentPage < pages - 1) {
      setCurrentStoryPage(globalStory.currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (globalStory.currentPage > 1) {
      setCurrentStoryPage(globalStory.currentPage - 1)
    }
  }

  return (
    <div className={styles.tale}>
      <Image src='images/characters/whale.png' alt='' />
      <Container>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colSpan={{ lg: 3, md: 1, base: 0 }} />
          <GridItem colSpan={{ lg: 6, md: 10, base: 12 }}>

            <Heading as='h1' className='heading-small' mb={3}>{title}</Heading>
            <Text className='lead'>
              {globalStory.storyPaged[globalStory.currentPage]}
            </Text>
            <div className={styles.buttonsWrapper}>
              <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Left.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage <= 1} onClick={handlePrevPage} />
              <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage >= pages - 1} onClick={handleNextPage} />
            </div>

            <Steps currentStep={globalStory.currentPage} size={pages} />

          </GridItem>
        </Grid>
      </Container>
    </div>
  )
}

export default viewPage
