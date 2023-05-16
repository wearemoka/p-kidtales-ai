import React from 'react'
import { Button, Image } from '@chakra-ui/react'
import styles from './TopBar.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'

function BackButton () {
  const router = useRouter()
  const { globalStory, setGlobalStory, globalPrompt, setGlobalPrompt } = useGlobalContext()

  const backButtonHandler = () => {
    const tmpStory = { ...globalStory }
    tmpStory.storyPaged = []
    tmpStory.story = ''
    setGlobalStory(tmpStory)

    const tmpPrompt = { ...globalPrompt }
    tmpPrompt.step = PROMPT_STEPS.LESSON
    setGlobalPrompt(tmpPrompt)

    router.back()
  }

  return (
    <Button
      className='big secondary only-icon'
      variant='solid'
      aria-label='Go back'
      rightIcon={<Image src='/icons/Arrow-Left.svg' alt='Back arrow outline icon' />}
      onClick={backButtonHandler}
    />
  )
}

export default BackButton
