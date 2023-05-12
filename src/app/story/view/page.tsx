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
    /* const emptyStoryStore = { story: { title: 'Leo and the Magical Moon', slug: 'leo-and-the-magical-moon-1683895456345', prompt: ['5-7', 'Giraffe', 'Leo', 'Moon', ''], story: "Title: Leo and the Magical Moon\n\nOnce upon a time, on the magical Moon, lived a curious Giraffe named Leo. Leo loved to explore and play with his friends, the Moon rabbits. \n\nOne day, as Leo was walking through a field of sparkling crystals, he noticed a group of Moon rabbits huddled together. Leo asked what was wrong, and they told him that they were afraid of the dark. \n\nLeo had an idea! He suggested they all go on an adventure to find the Moon's brightest star. The rabbits were hesitant, but Leo convinced them it would be fun. \n\nAs they journeyed through the Moon's forests, they met a wise owl who told them that the brightest star was on the other side of the Moon. Leo and the rabbits were excited to continue their adventure. \n\nThey had to cross a river of glittering stars, but Leo used his long neck to help the rabbits across safely. They climbed a mountain of Moon rocks and finally reached the other side of the Moon. \n\nThere, they found the brightest star shining brightly. The rabbits were amazed and thanked Leo for leading them on the adventure. \n\nLeo realized that being brave and trying new things can help overcome fears. He also learned that helping others is important. The rabbits felt more confident and happy, and they all danced under the shining star. \n\nFrom that day on, Leo and the Moon rabbits went on many adventures together and had lots of fun. They always remembered the lesson they had learned and were never afraid of the dark again. \n\nThe end.", id: 'B4YQShM8zFTSG1jJarHt' }, storyPaged: ['Title: Leo and the Magical Moon', 'Once upon a time, on the magical Moon, lived a curious Giraffe named Leo. Leo loved to explore and play with his friends, the Moon rabbits. ', 'One day, as Leo was walking through a field of sparkling crystals, he noticed a group of Moon rabbits huddled together. Leo asked what was wrong, and they told him that they were afraid of the dark. ', "Leo had an idea! He suggested they all go on an adventure to find the Moon's brightest star. The rabbits were hesitant, but Leo convinced them it would be fun. ", "As they journeyed through the Moon's forests, they met a wise owl who told them that the brightest star was on the other side of the Moon. Leo and the rabbits were excited to continue their adventure. ", 'They had to cross a river of glittering stars, but Leo used his long neck to help the rabbits across safely. They climbed a mountain of Moon rocks and finally reached the other side of the Moon. ', 'There, they found the brightest star shining brightly. The rabbits were amazed and thanked Leo for leading them on the adventure. ', 'Leo realized that being brave and trying new things can help overcome fears. He also learned that helping others is important. The rabbits felt more confident and happy, and they all danced under the shining star. ', 'From that day on, Leo and the Moon rabbits went on many adventures together and had lots of fun. They always remembered the lesson they had learned and were never afraid of the dark again. ', 'The end.'], currentPage: 0 }
    setGlobalStory(emptyStoryStore) */
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
