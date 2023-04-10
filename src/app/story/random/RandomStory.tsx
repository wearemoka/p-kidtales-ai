'use client'
import styles from './page.module.css'
import Button from '@/app/components/Story/Button/Button'
import { useState } from 'react'
import { ages, characters, adventures, places } from '../../services/constants/StoryParams'
import { getAiStory } from '../../services/ChatGPTService'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'
import { createSlugWithTimeStamp, generateRandomIndex, getStoryTitle } from '@/app/utils/helper'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function RandomStory () {
  const [status, setStatus] = useState('pending')
  const [storyResponse, setStoryResponse] = useState('')
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

  const handlerClickOnGenerateRandomStory = async () => {
    setStatus('process')
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomAdventures = generateRandomIndex(adventures)
    const randomPlace = generateRandomIndex(places)

    const response = await getAiStory(randomAge, randomCharacters, randomAdventures, 'Steve', randomPlace)
    const storyTitle = getStoryTitle(response.res)
    const slug = createSlugWithTimeStamp(storyTitle)
    if (storyTitle && slug) {
      addDocumentInFireStore(fireBaseStoryCollection, {
        title: storyTitle,
        slug,
        prompt: [randomAge, randomCharacters, randomAdventures, 'Steve', randomPlace],
        story: response.res
      })
    }
    setStatus('success')
    setStoryResponse(response.res)
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Generate random story</h2>
      <Button status={status} onClick={handlerClickOnGenerateRandomStory} buttonText='Generate random story' />
      <div className={styles.answerContainer}>
        {status === 'pending' && <h4 className={styles.loader}>Your story display here</h4>}
        {status === 'process' && <h4 className={styles.loader}>Loading...</h4>}
        {status === 'success' && (
          <div className={styles.loader}>
            {storyResponse}
          </div>
        )}
        {status === 'failed' && <p className={styles.loader}>Something went wrong</p>}
        {status === 'error' && <p className={styles.loader}>No data found</p>}
      </div>
    </main>
  )
}
export default RandomStory
