'use client'

import { useState } from 'react'
import { Container, Image, Heading, Text, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import styles from './initial.module.scss'

const Initial = () => {
  const [value, setValue] = useState('1')

  return (
    <div className={styles.initialPage}>
      <Image src='images/Initial.png' alt='' className={styles.bgImage} />
      <Container>
        <div className={styles.contentWrapper}>
          <Heading as='h1' className='heading text-center' mb={10}>Create your own unique story with AI.</Heading>
          <Text className='lead text-center' mb={3}>Create a story for </Text>
          <RadioGroup onChange={setValue} value={value} className='body-big' mb={3}>
            <Stack direction='row' justify='center'>
              <Radio value='1'>0-2 yrs</Radio>
              <Radio value='2'>3-5 yrs</Radio>
              <Radio value='3'>6-8 yrs</Radio>
            </Stack>
          </RadioGroup>
          <Text className='caption text-center text-secondary'>Choosing the age for a story is important because it affects the length, language, and other aspects of the story.</Text>
        </div>
      </Container>
    </div>
  )
}

export default Initial
