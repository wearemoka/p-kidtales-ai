'use client'
import { useGlobalContext } from '@/app/context/store'
import React, { useEffect } from 'react'
import styles from './components.module.css'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStory])

  return (
    <div className={styles.story}>
      <h4>Paginated story</h4>
      {storyPaginated[currentStoryPage]}
      <hr />

      <div>
        <button className={styles.btn} disabled={currentStoryPage <= 0} onClick={handlePrevPage}>Prev</button>
        <button className={styles.btn} disabled={currentStoryPage >= storyPaginated.length - 1} onClick={handleNextPage}>Next</button>
      </div>

      <h4>Complete story</h4>
      {globalStory}
    </div>
  )
}
