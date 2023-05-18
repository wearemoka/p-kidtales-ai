'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, ERROR_MESSAGES, lessonOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'
import { Box, Button, Center, Image, Input, VStack, Text } from '@chakra-ui/react'
import { getAiStory, moderateStringWithAI } from '@/app/services/ChatGPTService'
import { useEffect, useRef, useState } from 'react'
import { useMessageTime } from '@/app/hooks/useMessageTime'
import { IStoryStore } from '@/app/utils/interfaces'
import { useRouter } from 'next/navigation'
import styles from './story.module.scss'
import RandomButton from '../components/RandomButton/RandomButton'
import { checkPromptIsComplete, createSlugWithTimeStamp, getStoryTitle } from '../utils/helper'
import { ROUTES } from '@/app/utils/routes'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

const StoryPage = () => {
  const router = useRouter()
  const { globalPrompt, setGlobalPrompt, globalStory, setGlobalStory } = useGlobalContext()
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false)
  const loadingMessages = useMessageTime(isLoadingStory)
  const [hasError, setHasError] = useState<boolean>(false)
  const { age, character, name, scenario, lesson } = globalPrompt
  const inputLessonRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [flagged, setFlagged] = useState<boolean>(false)

  const promptMissingValues = () => {
    let missingValues: boolean = false

    if (!age) {
      setHasError(true)
      setGlobalPrompt({ ...globalPrompt, step: PROMPT_STEPS.LESSON })
      setErrorMessage(ERROR_MESSAGES.NO_AGE)
      missingValues = true
    }

    const missingPrompt = checkPromptIsComplete(globalPrompt)
    if (missingPrompt) {
      setHasError(true)
      setGlobalPrompt({ ...globalPrompt, step: missingPrompt })
      missingValues = true

      switch (missingPrompt) {
        case PROMPT_STEPS.CHARACTER:
          setErrorMessage(ERROR_MESSAGES.NO_CHARACTER)
          break
        case PROMPT_STEPS.NAME:
          setErrorMessage(ERROR_MESSAGES.NO_NAME)
          break
        case PROMPT_STEPS.SCENARIO:
          setErrorMessage(ERROR_MESSAGES.NO_SCENARIO)
          break
      }
    }
    return missingValues
  }

  useEffect(() => {
    if (globalPrompt.step === PROMPT_STEPS.GENERATION) {
      promptMissingValues()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPrompt])

  const writeStoryHandler = async () => {
    setIsLoadingStory(true)
    setFlaggedName(false)
    const response = await getAiStory(age, character, name, scenario, lesson)
    setIsLoadingStory(false)

    if (response.status === 'error' || !response?.res.startsWith('Title:')) {
      setHasError(true)
      setIsLoadingStory(false)
      setGlobalPrompt({ ...globalPrompt, step: PROMPT_STEPS.LESSON })
      return
    }

    const storyTitle = getStoryTitle(response.res)
    const slug = createSlugWithTimeStamp(storyTitle)

    if (storyTitle && slug) {
      const myStory = {
        title: storyTitle,
        slug,
        prompt: [age, character, name, scenario, lesson],
        story: response.res
      }

      const id = await addDocumentInFireStore(fireBaseStoryCollection, myStory)

      const story: IStoryStore = {
        story: { ...myStory, id },
        storyPaged: response.res.split('\n\n').filter((value: string) => value !== ''),
        currentPage: 0
      }

      setGlobalStory(story)
    }

    router.push(ROUTES.STORY_VIEW)
  }

  useEffect(() => {
    setFlagged(false)
    if (globalPrompt.step === PROMPT_STEPS.GENERATION && writeStoryHandler) {
      writeStoryHandler()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customLessonHandler = (lesson: string) => {
    const newStep: any = { ...globalPrompt, lesson }
    setGlobalPrompt(newStep)
  }

  const handleLessonKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      const lesson = inputLessonRef.current!.value
      const resp = await moderateStringWithAI(lesson)
      if (resp.results[0].flagged) {
        setFlagged(true)
      } else {
        setFlagged(false)
        writeStoryHandler()
      }
    }
  }

  return (
    <VStack className={styles.storyPage}>
      {/* Display the User prompt */}

      {!isLoadingStory && globalStory.storyPaged.length === 0 && (
        <>
          <UserPrompt promptOptions={globalPrompt} steps={PROMPT_STEPS} />
          <Center>
            {/* Display Character options */}
            {globalPrompt.step === PROMPT_STEPS.CHARACTER &&
              <GallerySelect
                title='Select a character'
                options={characterOpts}
                saveOn='character'
                columns={[2, 2, 2, 4]}
              />}

            {/* Display Name input */}
            {globalPrompt.step === PROMPT_STEPS.NAME &&
              <NameSelect
                title='Name your character'
                saveOn='name'
              />}

            {/* Display Scenario options */}
            {globalPrompt.step === PROMPT_STEPS.SCENARIO &&
              <GallerySelect
                title='Select a scenario'
                options={scenarioOpts}
                saveOn='scenario'
                columns={[2, 2, 2, 4]}
              />}

            {/* Display Lesson options */}
            {globalPrompt.step === PROMPT_STEPS.LESSON &&
              <VStack>

                <GallerySelect
                  title='Select a lesson'
                  options={lessonOpts}
                  saveOn='lesson'
                  columns={[2]}
                  afterClickHandler={writeStoryHandler}
                  type='noImg'
                />

                <Input
                  ref={inputLessonRef}
                  className='mt-20'
                  placeholder='Write my Own Lesson'
                  onChange={(e) => {
                    customLessonHandler(e.target.value)
                  }}
                  onKeyDown={handleLessonKeyDown}
                />
                {inputLessonRef.current && inputLessonRef.current.value?.length > 0 &&
                  <Button
                    rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />}
                    className='big primary only-icon'
                    onClick={writeStoryHandler}
                  />}

              </VStack>}

            {/* Random Dice */}
            <RandomButton actionAfterSave={writeStoryHandler} className={styles.random} />
          </Center>

        </>
      )}

      {isLoadingStory && (
        <div className={styles.loading}>
          <VStack justify='center'>
            <Text textAlign='center' className='body-big' my={8}>Create a story for {globalPrompt.age}</Text>
            <Box className='big-lead'>
              <Text textAlign='center'>Once upon a time a {globalPrompt.character}</Text>
              <Text textAlign='center'>called {globalPrompt.name}</Text>
              <Text textAlign='center'>had an amazing adventure in the {globalPrompt.scenario}</Text>
              <Text textAlign='center'>to learn about {globalPrompt.lesson}</Text>
            </Box>
            <Image src='images/Loading.png' alt='Wizard magic loading' />
            <Text className={`body ${styles.loadingText}`}>{loadingMessages}</Text>
          </VStack>
        </div>
      )}

      {hasError && !isLoadingStory && (
        <>
          <Text fontSize='xl' color='red'>{errorMessage}</Text>
          <Button onClick={() => setHasError(false)} className='big'>Try again</Button>
        </>
      )}

      {flagged &&
        <Box>
          This lesson cannot be used. Change the lesson to a different one.
        </Box>}
    </VStack>

  )
}
export default StoryPage
