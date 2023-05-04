'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, lessonOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'
import { Box, Button, Center, Image, Input, VStack, Text } from '@chakra-ui/react'
import { getAiStory } from '@/app/services/ChatGPTService'
import { useState } from 'react'
import { useMessageTime } from '@/app/hooks/useMessageTime'
import { IStoryStore } from '@/app/utils/interfaces'
import { useRouter } from 'next/navigation'
import styles from './story.module.scss'

const StoryPage = () => {
  const router = useRouter()
  const { globalPrompt, setGlobalPrompt, setGlobalStory } = useGlobalContext()
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false)
  const loadingMessages = useMessageTime(isLoadingStory)

  const writeStoryHandler = async () => {
    setIsLoadingStory(true)
    const { age, character, name, scenario, lesson } = globalPrompt
    const response = await getAiStory(age, character, name, scenario, lesson)
    setIsLoadingStory(false)

    const story: IStoryStore = {
      story: response.res,
      storyPaged: response.res.split('\n\n').filter((value: string) => value !== ''),
      currentPage: 0
    }

    setGlobalStory(story)

    router.push('/story/view')
  }

  const customLessonHandler = (lesson: string) => {
    const newStep: any = { ...globalPrompt, lesson }
    setGlobalPrompt(newStep)
  }

  return (
    <VStack>
      {/* Display the User prompt */}

      {!isLoadingStory && (
        <>
          <UserPrompt promptOptions={globalPrompt} steps={PROMPT_STEPS} />
          <Center>
            {/* Display Character options */}
            {globalPrompt.step === PROMPT_STEPS.CHARACTER &&
              <GallerySelect title='Select a character' options={characterOpts} saveOn='character' columns={[2, 2, 2, 4]} />}

            {/* Display Name input */}
            {globalPrompt.step === PROMPT_STEPS.NAME &&
              <NameSelect title='Name your character' saveOn='name' />}

            {/* Display Scensario options */}
            {globalPrompt.step === PROMPT_STEPS.SCENARIO &&
              <GallerySelect title='Select a scenario' options={scenarioOpts} saveOn='scenario' columns={[2, 2, 2, 4]} />}

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
                  className='mt-20'
                  placeholder='Write my Own Lesson'
                  onChange={(e) => {
                    customLessonHandler(e.target.value)
                  }}
                />
                <Button rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} className='big primary only-icon' onClick={writeStoryHandler} />
              </VStack>}
          </Center>
        </>
      )}

      {isLoadingStory && (
        <div className={styles.loading}>
          <VStack justify='center'>
            <Box className='big-lead' mb={8}>
              <Text textAlign='center'>Once upon a time a {globalPrompt.character}</Text>
              <Text textAlign='center'>called {globalPrompt.name}</Text>
              <Text textAlign='center'>had an amazing adventure in the {globalPrompt.scenario}</Text>
              <Text textAlign='center'>to learn about {globalPrompt.lesson}</Text>
            </Box>
            <Image src='images/Loading.png' alt='Wizard magic loading' />
            <h3>{loadingMessages}</h3>
          </VStack>
        </div>
      )}
    </VStack>
  )
}
export default StoryPage
