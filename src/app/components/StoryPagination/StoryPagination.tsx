import { useGlobalContext } from '@/app/context/store'
import { Button, HStack, Text } from '@chakra-ui/react'
import Steps from '../Steps/Steps'

export function StoryPagination () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const pages = globalStory.storyPaged.length

  const setCurrentStoryPage = (page: number) => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = page
    setGlobalStory(tmpStory)
  }

  const handleNextPage = () => {
    if (globalStory.currentPage < pages - 1) {
      setCurrentStoryPage(globalStory.currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (globalStory.currentPage > 1) {
      setCurrentStoryPage(globalStory.currentPage - 1)
    }
  }

  return (
    <>
      <Text>
        {globalStory.storyPaged[globalStory.currentPage]}
      </Text>

      <HStack>
        <Button disabled={globalStory.currentPage <= 1} onClick={handlePrevPage}>Prev</Button>
        <Steps currentStep={globalStory.currentPage} size={pages} />
        <Button disabled={globalStory.currentPage >= pages - 1} onClick={handleNextPage}>Next</Button>
      </HStack>

    </>
  )
}
