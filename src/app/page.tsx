'use client'

import { useEffect, useState, useRef } from 'react'
import { Container, Image, Heading, Text, Stack, Button, Grid, GridItem, Box, useMediaQuery } from '@chakra-ui/react'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext, emptyPrompt } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'
import { getRandomUserPrompt } from './utils/helper'
import AgeSelector from './components/AgeSelector/AgeSelector'
import { ROUTES } from '@/app/utils/routes'

const HomePage = () => {
  const router = useRouter()
  const [age, setAge] = useState<string>('')
  const { setGlobalPrompt } = useGlobalContext()

  useEffect(() => {
    setGlobalPrompt(emptyPrompt)
  }, [])

  const startCreateStoryButtonHandler = () => {
    const newStep: any = { ...emptyPrompt, age, step: PROMPT_STEPS.CHARACTER }
    setGlobalPrompt(newStep)
    router.push(ROUTES.STORY_GENERATE)
  }

  const randomizesStoryButtonHandler = () => {
    const randomStory = getRandomUserPrompt(age)
    setGlobalPrompt(randomStory)
    router.push(ROUTES.STORY_GENERATE)
  }

  const [isMobile] = useMediaQuery('(max-width: 600px)')

  const ageMessage = (
    <Box px={[0, 24, 24, 36]}>
      <Text className='caption text-center text-secondary'>Choosing the age for a story is important because it affects the length, language, and other aspects of the story.</Text>
    </Box>
  )

  const ref = useRef(null)

  useEffect(() => {
    import('@lottiefiles/lottie-player')
  })

  return (
    <div className={styles.initialPage}>
      <lottie-player
        id='firstLottie'
        ref={ref}
        autoplay
        loop
        mode='normal'
        src='/lotties/Wizard_animation.json'
        style={{
          position: 'absolute',
          zIndex: '-1',
          top: 'var(--lottie-top)',
          left: 'var(--lottie-left)',
          width: 'var(--lottie-width)'
        }}
      />
      {/* <Image src='/images/Initial.png' alt='' className={styles.bgImage} /> */}
      <Container>

        <div className={styles.contentWrapper}>
          <Grid templateColumns='repeat(12, 1fr)' gap={4}>
            <GridItem colSpan={{ lg: 2, md: 0, sm: 0, base: 0 }} />
            <GridItem colSpan={{ lg: 8, md: 12, sm: 12, base: 12 }}>
              <Heading as='h1' className='heading text-center' mb={10}>Enchanting AI-Powered Storytelling Adventures for Children</Heading>
              <Text className='body-big text-center' mb={3}>Create a story for </Text>

              <AgeSelector age={age} setAge={setAge} />
              {(!isMobile || (!age && isMobile))
                ? ageMessage
                : ''}

              <Box className={styles.buttonsWrapper}>
                {age &&
                  <div className={styles.buttonBottom}>
                    <Stack direction={{ xl: 'row', md: 'column', base: 'column' }} justify='center' spacing={{ md: '20px', base: '10px' }}>
                      <Button
                        aria-label='Create custom tale'
                        rightIcon={<Image src='icons/Stars.svg' alt='' />}
                        className='big primary'
                        onClick={startCreateStoryButtonHandler}
                      >
                        <label>Start creating my story</label>
                      </Button>
                      <Button
                        aria-label='Create random tale'
                        rightIcon={<Image src='icons/Dice.svg' alt='' />}
                        className='big secondary'
                        onClick={randomizesStoryButtonHandler}
                      >
                        <label>Let KidsTales create it for me</label>
                      </Button>
                    </Stack>
                  </div>}
              </Box>
            </GridItem>
            <GridItem colSpan={{ lg: 2, md: 0, sm: 0, base: 0 }} />
          </Grid>
        </div>

      </Container>
    </div>
  )
}

export default HomePage
