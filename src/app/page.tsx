'use client'

import { useState } from 'react'
import { Container, Image, Heading, Text, Radio, RadioGroup, Stack, Button, Grid, GridItem, Box } from '@chakra-ui/react'
import styles from './page.module.scss'

const HomePage = () => {
  const [age, setAge] = useState<string>('')

  const startCreateStoryButtonHandler = () => {
    console.log('Start creating my story')
  }

  const randomizesStoryButtonHandler = () => {
    console.log('Let KidsTales create a random story')
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

              <RadioGroup onChange={setAge} value={age} className='body-big' mb={3}>
                <Stack direction='row' justify='center' spacing={{ md: '20px', base: '10px' }}>
                  <Radio value='0-2'>0-2 yrs</Radio>
                  <Radio value='3-5'>3-5 yrs</Radio>
                  <Radio value='6-8'>6-8 yrs</Radio>
                </Stack>
              </RadioGroup>

              <Box px={[0, 24, 24, 36]}>
                <Text className='caption text-center text-secondary'>Choosing the age for a story is important because it affects the length, language, and other aspects of the story.</Text>
              </Box>

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
