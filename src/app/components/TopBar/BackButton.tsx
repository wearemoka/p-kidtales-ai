import React from 'react'
import { Button, Image } from '@chakra-ui/react'
import styles from './TopBar.module.scss'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'
import { ROUTES } from '@/app/utils/routes'

interface Props {
  historyPath: {prevPage: string, currentPage:string};
}

function BackButton ({ historyPath }: Props) {
  const router = useRouter()
  const { globalStory, setGlobalStory, globalPrompt, setGlobalPrompt } = useGlobalContext()

  const backButtonHandler = () => {
    const tmpStory = { ...globalStory }
    tmpStory.storyPaged = []
    tmpStory.story = {
      id: '',
      title: '',
      prompt: [],
      slug: '',
      story: ''
    }
    setGlobalStory(tmpStory)

    const tmpPrompt = { ...globalPrompt }
    tmpPrompt.step = PROMPT_STEPS.LESSON
    setGlobalPrompt(tmpPrompt)

    if (historyPath.prevPage === ROUTES.LIBRARY) {
      router.replace(ROUTES.LIBRARY)
    } else {
      router.replace(ROUTES.HOME)
    }
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
