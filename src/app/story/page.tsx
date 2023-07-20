'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, lessonOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'
import { Box, Button, Center, Image, Input, VStack, Text } from '@chakra-ui/react'
import { getAiStory, moderateStringWithAI } from '@/app/services/ChatGPTService'
import { useEffect, useRef, useState } from 'react'
import { useMessageTime } from '@/app/hooks/useMessageTime'
import { IStoryStore } from '@/app/utils/interfaces'
import { useRouter } from 'next/navigation'
import styles from './story.module.scss'
import RandomButton from '../components/RandomButton/RandomButton'
import { createSlugWithTimeStamp, getStoryTitle, paginateStory } from '../utils/helper'
import { ROUTES } from '@/app/utils/routes'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

const StoryPage = () => {
  const router = useRouter()
  const { globalPrompt, setGlobalPrompt, globalStory, setGlobalStory } = useGlobalContext()
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false)
  const loadingMessages = useMessageTime(isLoadingStory)
  const { age, character, name, scenario, lesson } = globalPrompt
  const inputLessonRef = useRef<HTMLInputElement>(null)
  const [flagged, setFlagged] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  let storyIdStored: string = ''
  const [customLesson, setCustomLesson] = useState<boolean>(false)

  useEffect(() => {
    if (globalPrompt.step === PROMPT_STEPS.GENERATION) {
      writeStoryHandler()
    }

    if (!isLoadingStory && customLesson && globalPrompt.age && globalPrompt.character && globalPrompt.name && globalPrompt.scenario && globalPrompt.lesson) {
      writeStoryHandler()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPrompt.step, customLesson])

  const writeStoryHandler = async () => {
    setError(false)
    setIsLoadingStory(true)
    setFlagged(false)
    const response = await getAiStory(age, character, name, scenario, lesson)
    setIsLoadingStory(false)

    if (response.status === 'error' || !response?.res.startsWith('Title:')) {
      setError(true)
    } else {
      const storyTitle = getStoryTitle(response.res)
      const slug = createSlugWithTimeStamp(storyTitle)

      if (storyTitle && slug) {
        const myStory = {
          title: storyTitle,
          slug,
          prompt: [age, character, name, scenario, lesson],
          story: response.res
        }

        if (!storyIdStored) {
          storyIdStored = await addDocumentInFireStore(fireBaseStoryCollection, myStory)
        }

        const story: IStoryStore = {
          story: { ...myStory, id: storyIdStored },
          storyPaged: paginateStory(response.res),
          currentPage: 0
        }

        setGlobalStory(story)
      }

      router.push(ROUTES.STORY_VIEW)
    }
  }

  useEffect(() => {
    setFlagged(false)
    setError(false)

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
    const lesson = inputLessonRef.current!.value
    if (e.key === 'Enter') {
      const resp = await moderateStringWithAI(lesson)
      if (resp.results[0].flagged) {
        setFlagged(true)
      } else {
        setFlagged(false)
        setCustomLesson(true)
        writeStoryHandler()
      }
    }
  }

  return (
    <VStack className={`${styles.storyPage} ${isLoadingStory ? styles.storyPageLoading : ''}`}>
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
            {globalPrompt.step === PROMPT_STEPS.LESSON && !customLesson &&
              <VStack>

                <GallerySelect
                  title='Select a lesson'
                  options={lessonOpts}
                  saveOn='lesson'
                  columns={[2]}
                  afterClickHandler={() => {
                    setCustomLesson(true)
                    writeStoryHandler()
                  }}
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

                {flagged &&
                  <Box>
                    This lesson cannot be used. Change the lesson to a different one.
                  </Box>}

                {globalPrompt.lesson.length > 0 &&
                  <Button
                    rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />}
                    className='big primary only-icon'
                    onClick={() => {
                      setCustomLesson(true)
                      writeStoryHandler()
                    }}
                  />}

              </VStack>}

            {/* Random Dice */}
            <RandomButton actionAfterSave={writeStoryHandler} className={styles.random} />
          </Center>

        </>
      )}

      {/* Error on response */}
      {/* {!isLoadingStory && error &&
        toast({
          position: 'top-right',
          title: 'The ChatGPT server is experiencing some issues.',
          description: 'We can not continue due to an external problem. Try again',
          status: 'info',
          duration: 9000
        })} */}
      {!isLoadingStory && error &&
        <VStack>
          <Text className='lead'>
            There has been an error with the AI, we could not generate your story.
          </Text>
          <Button
            rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />}
            className='big primary'
            onClick={writeStoryHandler}
            variant='outline'
          >
            Try again
          </Button>
        </VStack>}

      {isLoadingStory && (
        <div className={styles.loading}>
          <VStack justify='center'>
            <Text textAlign='center' className='body-big' mb={8}>Create a story for {globalPrompt.age}</Text>
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

    </VStack>

  )
}
export default StoryPage
