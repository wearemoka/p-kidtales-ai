import React from 'react'
import { Button, Image } from '@chakra-ui/react'
import styles from './TopBar.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'

function BackButton () {
  const router = useRouter()
  const { globalStory, setGlobalStory } = useGlobalContext()

  return (
    <Button
      className={styles.backButton}
      variant='solid'
      aria-label='Go back'
      rightIcon={<Image src='/icons/ArrowLeft.svg' alt='Back arrow outline icon' />}
      onClick={() => {
        const tmpStory = { ...globalStory }
        tmpStory.storyPaged = []
        tmpStory.currentPage = PROMPT_STEPS.SCENARIO
        console.log(tmpStory)
        setGlobalStory(tmpStory)
        router.back()
      }}
    />
  )
}

export default BackButton
