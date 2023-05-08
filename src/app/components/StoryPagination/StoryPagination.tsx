import { useGlobalContext } from '@/app/context/store'
import { Button, HStack, Text, Image, useDisclosure } from '@chakra-ui/react'
import Steps from '../Steps/Steps'
import ModalOverlayWrapper from '../ModalWrapper/ModalOverlayWrapper'
import { useRouter } from 'next/navigation'

export function StoryPagination () {
  const { globalStory, setGlobalStory } = useGlobalContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pages = globalStory.storyPaged.length
  const router = useRouter()

  const setCurrentStoryPage = (page: number) => {
    const tmpStory = { ...globalStory }
    tmpStory.currentPage = page
    setGlobalStory(tmpStory)
  }

  const handleNextPage = () => {
    if (globalStory.currentPage < pages - 1) {
      setCurrentStoryPage(globalStory.currentPage + 1)
    } else { // no more pages
      console.log('next')
      onOpen()
    }
  }

  const handlePrevPage = () => {
    if (globalStory.currentPage > 1) {
      setCurrentStoryPage(globalStory.currentPage - 1)
    }
  }

  const openLibrary = () => {
    console.log('navegar a libreria')
    router.replace('/library')
  }

  const generateNewStory = () => {
    console.log('navegar a home')
    router.replace('/')
  }

  return (
    <>
      <Text>
        {globalStory.storyPaged[globalStory.currentPage]}
      </Text>

      <HStack>
        <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage <= 1} onClick={handlePrevPage} />
        <Steps currentStep={globalStory.currentPage} size={pages} />
        <Button className='big secondary only-icon' rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />} disabled={globalStory.currentPage >= pages - 1} onClick={handleNextPage} />
      </HStack>

      {/* Modal to display */}
      <ModalOverlayWrapper
        isOpen={isOpen}
        onClose={onClose}
        primaryActionLabel='Create another story'
        primaryAction={generateNewStory}
        secondaryActionLabel='View library'
        secondaryAction={openLibrary}
        closeLabelButton='Back to Story'
      />
    </>
  )
}
