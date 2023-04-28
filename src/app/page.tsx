'use client'

import { useState } from 'react'
import { Container, Image, Heading, Text, Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import styles from './page.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'

const HomePage = () => {
  const router = useRouter()
  const [age, setAge] = useState<string>('')
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const startCreateStoryButtonHandler = () => {
    const newStep: any = { ...globalPrompt, age, step: PROMPT_STEPS.CHARACTER }
    setGlobalPrompt(newStep)
    router.push('/story')
  }

  const randomizesStoryButtonHandler = () => {
    console.log('Let KidsTales create a random story')
  }

  return (
    <div className={styles.initialPage}>
      <Image src='images/Initial.png' alt='' className={styles.bgImage} />
      <Container>

        <div className={styles.contentWrapper}>
          <Heading as='h1' className='heading text-center' mb={10}>Create your own unique story with AI.</Heading>
          <Text className='lead text-center' mb={3}>Create a story for </Text>

          <RadioGroup onChange={setAge} value={age} className='body-big' mb={3}>
            <Stack direction='row' justify='center'>
              <Radio value='0-2'>0-2 yrs</Radio>
              <Radio value='3-5'>3-5 yrs</Radio>
              <Radio value='6-8'>6-8 yrs</Radio>
            </Stack>
          </RadioGroup>

          <Text className='caption text-center text-secondary'>Choosing the age for a story is important because it affects the length, language, and other aspects of the story.</Text>
        </div>

        {age &&
          <div className={styles.buttonBottom}>
            <Stack direction='column'>
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

      </Container>
    </div>
  )
}

export default HomePage
