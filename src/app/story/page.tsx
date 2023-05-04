'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, lessonOpts, namesOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'
import { Button, Center, Image, Input, VStack } from '@chakra-ui/react'
import { getAiStory } from '@/app/services/ChatGPTService'
import { useEffect, useState } from 'react'
import { useMessageTime } from '@/app/hooks/useMessageTime'
import { IStoryStore } from '@/app/utils/interfaces'
import { useRouter } from 'next/navigation'
import RandomButton from '../components/RandomButton/RandomButton'
import { ROUTES } from '@/app/utils/routes'
import { paginateStory } from '@/app/utils/helper'

const StoryPage = () => {
  const router = useRouter()
  const { globalPrompt, setGlobalPrompt, setGlobalStory } = useGlobalContext()
  const [isLoadingStory, setIsLoadingStory] = useState<boolean>(false)
  const loadingMessages = useMessageTime(isLoadingStory)

  useEffect(() => {
    if (globalPrompt.step === PROMPT_STEPS.GENERATION && writeStoryHandler) {
      writeStoryHandler()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const writeStoryHandler = async () => {
    setIsLoadingStory(true)
    const { age, character, name, scenario, lesson } = globalPrompt
    const response = await getAiStory(age, character, name, scenario, lesson)
    setIsLoadingStory(false)

    const story: IStoryStore = {
      story: response.res,
      storyPaged: paginateStory(response.res),
      currentPage: 0
    }

    setGlobalStory(story)

    router.push(ROUTES.STORY_VIEW)
  }

  const customLessonHandler = (lesson: string) => {
    const newStep: any = { ...globalPrompt, lesson }
    setGlobalPrompt(newStep)
  }

  return (
    <VStack>
      {/* Display the User prompt */}
      <UserPrompt promptOptions={globalPrompt} steps={PROMPT_STEPS} />

      {!isLoadingStory && (
        <>
          <Center>
            {/* Display Character options */}
            {globalPrompt.step === PROMPT_STEPS.CHARACTER &&
              <VStack>
                <GallerySelect title='Select a character' options={characterOpts} saveOn='character' columns={[2, 2]} />
                <RandomButton options={characterOpts} saveOn='character' />
              </VStack>}

            {/* Display Name input */}
            {globalPrompt.step === PROMPT_STEPS.NAME &&
              <VStack>
                <NameSelect title='Name your character' saveOn='name' />
                <RandomButton options={namesOpts} saveOn='name' />
              </VStack>}

            {/* Display Scensario options */}
            {globalPrompt.step === PROMPT_STEPS.SCENARIO &&
              <VStack>
                <GallerySelect title='Select a scenario' options={scenarioOpts} saveOn='scenario' columns={[2, 2]} />
                <RandomButton options={scenarioOpts} saveOn='scenario' />
              </VStack>}

            {/* Display Lesson options */}
            {globalPrompt.step === PROMPT_STEPS.LESSON &&
              <VStack>

                <GallerySelect
                  title='Select a lesson'
                  options={lessonOpts}
                  saveOn='lesson'
                  columns={[4, 2]}
                  afterClickHandler={writeStoryHandler}
                />

                <Input
                  placeholder='Write my Own Lesson'
                  onChange={(e) => {
                    customLessonHandler(e.target.value)
                  }}
                />
                <Button
                  variant='outline'
                  onClick={writeStoryHandler}
                >
                  Write!
                </Button>

                <RandomButton options={lessonOpts} saveOn='lesson' actionAfterSave={writeStoryHandler} />
              </VStack>}
          </Center>

        </>
      )}

      {isLoadingStory && (
        <VStack>
          <Image src='images/Initial.png' alt='Wizard magic loading' />
          <h3>{loadingMessages}</h3>
        </VStack>
      )}
    </VStack>
  )
}
export default StoryPage
