'use client'
import styles from './page.module.scss'
import Button from '@/app/components/Story/Button/Button'
import { useState } from 'react'
import { ages, characters, places, lessons } from '../../services/constants/StoryParams'
import { getAiStory } from '../../services/ChatGPTService'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'
import { createSlugWithTimeStamp, generateRandomIndex, getStoryTitle } from '@/app/utils/helper'
import { useMessageTime } from '@/app/hooks/useMessageTime'
import { useGlobalContext } from '@/app/context/store'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function RandomStory () {
  const { setGlobalStory } = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

  const handlerClickOnGenerateRandomStory = async () => {
    setGlobalStory('Your Story will be displayed here')
    setLoading(true)
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomPlace = generateRandomIndex(places)
    const randomLesson = generateRandomIndex(lessons)

    const response = await getAiStory(randomAge, randomCharacters, 'Steve', randomPlace, randomLesson)
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
        prompt: [randomAge, randomCharacters, 'Steve', randomPlace, randomLesson],
        story: response.res
      })
    }
    setLoading(false)
    setGlobalStory(response.res)
  }

  // Change message on loading times
  const loadingMessage = useMessageTime(loading)

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Generate random story</h2>

      <Button enabled={!loading} onClick={handlerClickOnGenerateRandomStory} buttonText='Generate random story' />

      <div className={styles.loader}>
        {loading && <div>{loadingMessage}</div>}
      </div>

    </main>
  )
}
export default RandomStory
