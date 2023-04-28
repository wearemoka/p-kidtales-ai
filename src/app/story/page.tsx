'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, lessonOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'
import { Center, VStack } from '@chakra-ui/react'

const StoryPage = () => {
  const { globalPrompt } = useGlobalContext()

  return (
    <VStack>

      <Center>Create a story for {globalPrompt.age}</Center>

      {/* Display the User prompt */}
      <UserPrompt promptOptions={globalPrompt} steps={PROMPT_STEPS} />

      <Center>
        {/* Display Character options */}
        {globalPrompt.step === PROMPT_STEPS.CHARACTER && <GallerySelect title='Select a character' options={characterOpts} saveOn='character' />}

        {/* Display Name input */}
        {globalPrompt.step === PROMPT_STEPS.NAME && <NameSelect title='Name your character' saveOn='name' />}

        {/* Display Scensario options */}
        {globalPrompt.step === PROMPT_STEPS.SCENARIO && <GallerySelect title='Select a scenario' options={scenarioOpts} saveOn='scenario' />}

        {/* Display Lesson options */}
        {globalPrompt.step === PROMPT_STEPS.LESSON && <GallerySelect title='Select a lesson' options={lessonOpts} saveOn='lesson' />}
      </Center>
    </VStack>
  )
}
export default StoryPage
