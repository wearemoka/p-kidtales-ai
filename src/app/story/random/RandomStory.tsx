'use client'
import styles from './page.module.css'
import Button from '@/app/components/Story/Button/Button'
import { useEffect, useState } from 'react'
import { ages, characters, adventures, places } from '../../services/constants/StoryParams'
import { getAiStory } from '../../services/ChatGPTService'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'
import { createSlugWithTimeStamp, generateRandomIndex, getStoryTitle } from '@/app/utils/helper'
import { LoadingMessages } from '@/app/utils/constants'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function RandomStory () {
  const [loading, setLoading] = useState<boolean>(false)
  const [messageIndex, setMessageIndex] = useState<number>(0)
  const [storyResponse, setStoryResponse] = useState('')
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

  const handlerClickOnGenerateRandomStory = async () => {
    setLoading(true)
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomAdventures = generateRandomIndex(adventures)
    const randomPlace = generateRandomIndex(places)

    const response = await getAiStory(randomAge, randomCharacters, randomAdventures, 'Steve', randomPlace)
    if (response.status === 'error') {
      setLoading(false)
      return
    }
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
    setLoading(false)
    setStoryResponse(response.res)
  }

  // Change message on loading times
  useEffect(() => {
    let timer

    if (loading) {
      setStoryResponse(LoadingMessages[messageIndex])

      timer = setTimeout(() => {
        if (messageIndex < LoadingMessages.length - 1) {
          setMessageIndex(messageIndex + 1)
          setStoryResponse(LoadingMessages[messageIndex + 1])
        }
      }, 5000)
    } else {
      setMessageIndex(0)
      clearTimeout(timer)
    }
  }, [loading, messageIndex])

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Generate random story</h2>

      <Button enabled={!loading} onClick={handlerClickOnGenerateRandomStory} buttonText='Generate random story' />

      <div className={styles.loader}>
        {storyResponse}
      </div>

    </main>
  )
}
export default RandomStory
