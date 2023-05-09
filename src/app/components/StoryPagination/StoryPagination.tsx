import { useGlobalContext } from '@/app/context/store'
import { Button, HStack, Text, Image } from '@chakra-ui/react'
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
      <Text className='lead'>
        {globalStory.storyPaged[globalStory.currentPage]}
      </Text>

      <div>
        <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage <= 1} onClick={handlePrevPage} />
        <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage >= pages - 1} onClick={handleNextPage} />
      </div>

      <Steps currentStep={globalStory.currentPage} size={pages} />
    </>
  )
}
