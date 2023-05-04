'use client'

import { useState } from 'react'
import { Container, Image, Heading, Text, Stack, Button, Grid, GridItem } from '@chakra-ui/react'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'
import { getRandomUserPrompt } from './utils/helper'
import AgeSelector from './components/AgeSelector/AgeSelector'
import { ROUTES } from '@/app/utils/routes'

const HomePage = () => {
  const router = useRouter()
  const [age, setAge] = useState<string>('')
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const startCreateStoryButtonHandler = () => {
    const newStep: any = { ...globalPrompt, age, step: PROMPT_STEPS.CHARACTER }
    setGlobalPrompt(newStep)
    router.push(ROUTES.STORY_GENERATE)
  }

  const randomizesStoryButtonHandler = () => {
    const randomStory = getRandomUserPrompt(age)
    setGlobalPrompt(randomStory)
    router.push(ROUTES.STORY_GENERATE)
  }

  return (
    <div className={styles.initialPage}>
      <Image src='images/Initial.png' alt='' className={styles.bgImage} />
      <Container>

        <div className={styles.contentWrapper}>
          <Grid templateColumns='repeat(12, 1fr)' gap={4}>
            <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
            <GridItem colSpan={{ lg: 9, md: 12, base: 12 }}>
              <Heading as='h1' className='heading text-center' mb={10}>Unleash your imagination with AI-powered story creation</Heading>
              <Text className='body-big text-center' mb={3}>Create a story for </Text>

              <AgeSelector age={age} setAge={setAge} />

              {age &&
                <div className={styles.buttonBottom}>
                  <Stack direction={{ md: 'row', base: 'column' }} justify='center' spacing={{ md: '20px', base: '10px' }}>
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
            </GridItem>
            <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
          </Grid>
        </div>

      </Container>
    </div>
  )
}

export default HomePage
