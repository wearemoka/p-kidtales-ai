'use client'
import styles from './page.module.css'
import Button from '@/app/components/Story/Button/Button'
import { useState } from 'react'
import { ages, characters, adventures, places } from '../../services/constants/StoryParams'
import { getAiStory } from '../../services/ChatGPTService'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'
import { createSlugWithTimeStamp, generateRandomIndex, getStoryTitle } from '@/app/utils/helper'

export interface StoryAttrs {
  role: string
  content: string
  title: string
  prompt: string[]
  generateFireBaseStoryKey : string
}
/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function RandomStory () {
  const [storyAttrs, setStoryAttrs] = useState<StoryAttrs>({
    role: '',
    content: '',
    title: '',
    prompt: [],
    generateFireBaseStoryKey: ''
  })
  const [status, setStatus] = useState('pending')
  const { content } = storyAttrs
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

  const handlerClickOnGenerateRandomStory = async () => {
    setStatus('process')
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomAdventures = generateRandomIndex(adventures)
    const randomPlace = generateRandomIndex(places)

    getAiStory(randomAge, randomCharacters, randomAdventures, randomPlace).then(
      async (res) => {
        if (res?.error) {
          setStatus('failed')
          return
        }
        const storyTitle = getStoryTitle(res?.choices[0]?.message?.content)
        const slug = createSlugWithTimeStamp(storyTitle)
        setStatus('success')
        setStoryAttrs((preViewState) => {
          return {
            ...preViewState,
            role: res?.choices?.[0]?.message?.role,
            content: res?.choices[0]?.message?.content,
            title: getStoryTitle(res?.choices[0]?.message?.content),
            prompt: [randomAge, randomCharacters, randomAdventures, randomPlace]
          }
        })
        await addDocumentInFireStore(fireBaseStoryCollection, {
          title: storyTitle,
          slug,
          prompt: [randomAge, randomCharacters, randomAdventures, randomPlace],
          story: res?.choices[0]?.message?.content
        })
      },
      (err) => {
        setStatus('error')
        console.log('e', err)
      }
    )
  }
  function createMarkup () {
    const splitAnswer = storyAttrs.content.split('\n').filter((text) => text !== '')
    return splitAnswer.map((text, index) => <p key={`${index}`} className={styles.description}>{text}</p>)
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Generate random story</h2>
      <Button status={status} onClick={handlerClickOnGenerateRandomStory} buttonText='Generate random story' />
      <div className={styles.answerContainer}>
        {status === 'pending' && <h4 className={styles.loader}>Your story display here</h4>}
        {status === 'process' && <h4 className={styles.loader}>Loading...</h4>}
        {status === 'success' && content !== '' && (
          <div className={styles.loader}>
            {createMarkup()}
          </div>
        )}
        {status === 'failed' && <p className={styles.loader}>Something went wrong</p>}
        {status === 'error' && <p className={styles.loader}>No data found</p>}
      </div>
    </main>
  )
}
export default RandomStory
