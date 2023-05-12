'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/app/context/store'
import { Heading, Container, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import styles from './tale.module.scss'
import ModalOverlayWrapper from '@/app/components/ModalWrapper/ModalOverlayWrapper'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/app/utils/routes'
import Slider from 'react-slick'

function viewPage () {
  const { globalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    const tmpStory = globalStory.storyPaged || null
    if (tmpStory && tmpStory.length > 0) {
      const cleanTitle = tmpStory[0].replace('Title: ', '')
      setTitle(cleanTitle)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openLibrary = () => {
    router.replace(ROUTES.LIBRARY)
  }

  const generateNewStory = () => {
    router.replace(ROUTES.HOME)
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      )
    }
  }

  return (
    <div className={styles.tale}>
      <Image src='images/characters/whale.png' alt='' />
      <Container>
        <Heading as='h1' className='heading-small' mb={3} mt={10}>{title}</Heading>

        <Slider {...settings}>
          {globalStory.storyPaged.slice(1).map((page, index) =>
            <div key={index}>
              <Text className='lead'>
                {page}
              </Text>
            </div>)}
        </Slider>

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
