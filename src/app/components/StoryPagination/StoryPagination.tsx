'use client'

import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Steps from '../Steps/Steps'

interface Props {
  title: string,
  story: string[]
}

export function StoryPagination ({ title, story } : Props) {
  const [currentStoryPage, setCurrentStoryPage] = useState<number>(0)
  const pages = story.length

  const handleNextPage = () => {
    if (currentStoryPage < pages) {
      setCurrentStoryPage(currentStoryPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentStoryPage > 0) {
      setCurrentStoryPage(currentStoryPage - 1)
    }
  }

  return (
    <>
      <Heading>{title}</Heading>

      <Text>
        {story[currentStoryPage]}
      </Text>

      <HStack>
        <Button disabled={currentStoryPage <= 0} onClick={handlePrevPage}>Prev</Button>
        <Steps currentStep={currentStoryPage} size={pages} />
        <Button disabled={currentStoryPage >= pages - 1} onClick={handleNextPage}>Next</Button>
      </HStack>

    </>
  )
}
