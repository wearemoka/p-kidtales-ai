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
  const { globalStory, modalOpened, setModalOpened } = useGlobalContext()
  const [title, setTitle] = useState<string>('')
  const [firstSlide, setfirstSlide] = useState<boolean>(true)
  const [lastSlide, setlastSlide] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const sliderRef = useRef<Slider>(null)
  let timeoutID: any = null
  const MaxTimeOut = process.env.NEXT_PUBLIC_STORY_TIMER_ALERT_LAST_PAGE ? parseInt(process.env.NEXT_PUBLIC_STORY_TIMER_ALERT_LAST_PAGE) : 8000

  const modalOpenedRef = useRef(modalOpened)
  modalOpenedRef.current = modalOpened

  const AgeLarge = globalStory.story.prompt[0] === '7-10'

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
        rightIcon={<Image src='/icons/Chevron-Right.svg' alt='Chevron right outline white icon' />}
        className={`big only-icon button-next slick-next ${lastSlide ? styles.slideDisable : ''}`}
        onClick={() => {
          sliderRef.current?.slickNext()
        }}
      />
    )
  }

  function SamplePrevArrow () {
    return (
      <Button
        rightIcon={<Image src='/icons/Chevron-Left.svg' alt='Chevron left outline white icon' />}
        className={`big only-icon button-prev slick-prev ${firstSlide ? styles.slideDisable : ''}`}
        onClick={() => {
          sliderRef.current?.slickPrev()
        }}
      />
    )
  }

  function closeModal () {
    setModalOpened('')
    onClose()
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
    arrows: true,
    afterChange: function (currentIndex: number) {
      const slidesToShow = globalStory.storyPaged.length - 2
      if (currentIndex === slidesToShow) {
        setlastSlide(true)
        timeoutID = setTimeout(function (modalOpenedRef) {
          if (!modalOpenedRef.current) {
            setModalOpened('create-another-story')
            onOpen()
          }
        }, MaxTimeOut, modalOpenedRef)
      } else {
        setlastSlide(false)
        if (timeoutID) {
          clearTimeout(timeoutID)
        }
      }
      if (currentIndex === 0) {
        setfirstSlide(true)
      } else {
        setfirstSlide(false)
      }
    }
  }

  return (
    <div className={styles.tale}>
      <Image src={`/images/characters/${characterImg}.png`} alt='Main character of the story' />
      <Container>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colStart={{ lg: 3, md: 2, base: 0 }} colSpan={{ lg: 8, md: 10, base: 12 }} mt={{ lg: 4, md: 4, base: 30 }}>
            <Heading as='h1' className='heading-small' mb={3} mt={10}>{title}</Heading>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem colStart={{ lg: 3, md: 2, base: 0 }} colSpan={{ lg: 8, md: 10, base: 12 }} mt={{ lg: 4, md: 4, base: 0 }}>
            <Slider {...settings} ref={sliderRef} className='story'>
              {globalStory.storyPaged.slice(1).map((page, index) =>
                <div key={index}>
                  <Text className={AgeLarge ? 'lead' : 'big-lead'}>
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
        onClose={closeModal}
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
