'use client'
import { useGlobalContext } from '@/app/context/store'
import React, { useEffect } from 'react'

export function StoryPagination () {
  const { globalStory, currentStoryPage, setCurrentStoryPage } = useGlobalContext()
  const storyPaginated = globalStory.split('\n').filter((value) => value !== '')

  const handleNextPage = () => {
    setCurrentStoryPage(currentStoryPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentStoryPage(currentStoryPage - 1)
  }

  useEffect(() => {
    setCurrentStoryPage(0)
  }, [globalStory])

  return (
    <div>
      {storyPaginated[currentStoryPage]}
      <div>
        <button disabled={currentStoryPage <= 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={currentStoryPage >= storyPaginated.length - 1} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}
