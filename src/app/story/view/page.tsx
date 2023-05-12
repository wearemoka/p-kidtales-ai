'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/app/context/store'
import { Heading, Container, GridItem, Grid, Image, Button, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import styles from './tale.module.scss'
import Steps from '@/app/components/Steps/Steps'
import ModalOverlayWrapper from '@/app/components/ModalWrapper/ModalOverlayWrapper'
import { useRouter } from 'next/navigation'

function viewPage () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const pages = globalStory.storyPaged.length
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

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
    } else { // no more pages
      onOpen()
    }
  }

  const handlePrevPage = () => {
    if (globalStory.currentPage > 1) {
      setCurrentStoryPage(globalStory.currentPage - 1)
    }
  }

  const openLibrary = () => {
    router.replace('/library')
  }

  const generateNewStory = () => {
    router.replace('/')
  }

  return (
    <div className={styles.tale}>
      <Image src='images/characters/whale.png' alt='' />
      <Container>
        <Grid templateColumns='repeat(12, 1fr)' gap={4} className={styles.taleWrapper}>

          <GridItem colSpan={{ lg: 2, md: 1, base: 0 }} className={styles.buttonWrapper}>
            <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Left.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage <= 1} onClick={handlePrevPage} />
          </GridItem>

          <GridItem colSpan={{ lg: 8, md: 10, base: 12 }}>
            <Heading as='h1' className='heading-small' mb={3} mt={10}>{title}</Heading>
            <Text className='lead'>
              {globalStory.storyPaged[globalStory.currentPage]}
            </Text>
            <Steps currentStep={globalStory.currentPage} size={pages} />
          </GridItem>

          <GridItem colSpan={{ lg: 2, md: 1, base: 0 }} className={styles.buttonWrapper}>
            <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage >= pages - 1} onClick={handleNextPage} />
          </GridItem>

        </Grid>
      </Container>

      {/* Modal to display */}
      <ModalOverlayWrapper
        isOpen={isOpen}
        onClose={onClose}
        primaryActionLabel='Create another story'
        primaryAction={generateNewStory}
        secondaryActionLabel='View library'
        secondaryAction={openLibrary}
        closeLabelButton='Back to Story'
      />
    </div>
  )
}

export default viewPage
