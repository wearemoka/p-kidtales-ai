'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/app/context/store'
import { Heading, Container, Image, Text, useDisclosure, Grid, GridItem, Button } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import styles from './tale.module.scss'
import ModalWrapper from '@/app/components/ModalWrapper/ModalWrapper'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/app/utils/routes'
import Slider from 'react-slick'

function viewPage () {
  const { globalStory } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const sliderRef = useRef<Slider>(null)

  const characterImg = globalStory?.story?.prompt[1]?.toLowerCase()

  useEffect(() => {
    const tmpStory = globalStory.storyPaged || null
    if (tmpStory && tmpStory.length > 0) {
      const cleanTitle = tmpStory[0].replace('Title: ', '')
      setTitle(cleanTitle)
    } else {
      // No story to display
      router.replace(ROUTES.HOME)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openLibrary = () => {
    router.replace(ROUTES.LIBRARY)
  }

  const generateNewStory = () => {
    router.replace(ROUTES.HOME)
  }

  function SampleNextArrow () {
    return (
      <Button
        rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />}
        className='big only-icon secondary button-next slick-next'
        onClick={() => {
          sliderRef.current?.slickNext()
        }}
      />
    )
  }

  function SamplePrevArrow () {
    return (
      <Button
        rightIcon={<Image src='/icons/Arrow-Left.svg' alt='Arrow left outline white icon' />}
        className='big only-icon secondary button-prev slick-prev'
        onClick={() => {
          sliderRef.current?.slickPrev()
        }}
      />
    )
  }

  // Settings fot Slider Story
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: false,
    afterChange: function (currentIndex: number) {
      const slidesToShow = globalStory.storyPaged.length - 2
      if (currentIndex === slidesToShow) {
        setTimeout(() => {
          onOpen()
        }, 5000)
      }
    }
  }

  return (
    <div className={styles.tale}>
      <Image src={`/images/characters/${characterImg}.png`} alt='Main character of the story' />
      <Container>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colStart={{ lg: 3, md: 0, base: 0 }} colSpan={{ lg: 8, md: 12, base: 12 }} mt={{ lg: 4, md: 4, base: 30 }}>
            <Heading as='h1' className='heading-small' mb={3} mt={10}>{title}</Heading>

            <Slider {...settings} ref={sliderRef} className='story'>
              {globalStory.storyPaged.slice(1).map((page, index) =>
                <div key={index}>
                  <Text className='lead'>
                    {page}
                  </Text>
                </div>)}
            </Slider>
          </GridItem>
        </Grid>

      </Container>

      {/* Modal to display */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        primaryActionLabel='Create another story'
        primaryAction={generateNewStory}
        secondaryActionLabel='View library'
        secondaryAction={openLibrary}
        modalTitle=''
        alignmentBottom
        rightIconPrimaryAction={<Image src='/icons/Stars.svg' alt='Stars outline white icon' />}
        rightIconSecondaryAction={<Image src='/icons/Library.svg' alt='Library outline white icon' />}
      />
    </div>
  )
}

export default viewPage
