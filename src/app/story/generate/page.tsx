'use client'
import styles from './page.module.css'
import Button from '@/app/components/Story/Button/Button'
import { useState } from 'react'
import { ages, characters, adventures, places } from '../../service/constants/StoryParams'
import { getAiStory } from '../../service/ChatGPTService'
import { addDocumentInFireStore, updateDocumentInFireStore } from '@/app/service/FirebaseService'
import Rating from '@/app/components/Story/Rating/Rating'
import { createSlugWithTimeStamp, generateRandomIndex } from '@/app/utils/helper'
import Link from 'next/link'
import { baseURL } from '@/app/shareStoryLinkConfig/config'

export interface StoryAttrs {
  role: string
  content: string
  title: string
  rating: string
  prompt: string[]
  sharedLink: string
  generateFireBaseStoryKey : string
}

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function GenerateStory () {
  const [storyAttrs, setStoryAttrs] = useState<StoryAttrs>({
    role: '',
    content: '',
    title: '',
    rating: '',
    prompt: [],
    generateFireBaseStoryKey: '',
    sharedLink: ''
  })
  const [status, setStatus] = useState('pending')
  const { title, rating, generateFireBaseStoryKey, sharedLink, content } = storyAttrs
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_END_POINT as string
  const getStoryTitle = (message: string) => {
    const splitAnswer = message.split('\n').filter((text) => text !== '')
    return splitAnswer[0].split('Title:')[1].trim()
  }
  const handlerClickOnGenerateRandomStory = () => {
    setStatus('process')
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomAdventures = generateRandomIndex(adventures)
    const randomPlace = generateRandomIndex(places)
    getAiStory(randomAge, randomCharacters, randomAdventures, randomPlace).then(
      async (res) => {
        const storyTitle = getStoryTitle(res?.choices[0]?.message?.content)
        const slug = createSlugWithTimeStamp(storyTitle)
        const link = baseURL + slug
        setStatus('success')
        addDocumentInFireStore(fireBaseStoryCollection, {
          title: storyTitle,
          sharedLink: link,
          rating: 0,
          ratedPeopleCount: 0,
          slug,
          prompt: [randomAge, randomCharacters, randomAdventures, randomPlace],
          story: res?.choices[0]?.message?.content
        }).then((response) => {
          setStoryAttrs((preViewState) => {
            return {
              ...preViewState,
              role: res?.choices?.[0]?.message?.role,
              content: res?.choices[0]?.message?.content,
              sharedLink: link,
              generateFireBaseStoryKey: response,
              title: getStoryTitle(res?.choices[0]?.message?.content),
              prompt: [randomAge, randomCharacters, randomAdventures, randomPlace]
            }
          })
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

  const changeRatingHandler = (rating: string) => {
    setStoryAttrs((preViewState) => {
      return {
        ...preViewState,
        rating
      }
    })
  }
  const submitStoryHandler = async () => {
    setStatus('process')
    await updateDocumentInFireStore(fireBaseStoryCollection, {
      rating,
      ratedPeopleCount: 1
    }, generateFireBaseStoryKey).then(() => {
      setStatus('success')
    }).catch(() => {
      setStatus('failed')
    })
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
            <Rating
              rating={storyAttrs.rating}
              onRatingChange={changeRatingHandler}
            />
            <Button
              isDisabled={!!((!title || !rating))}
              status={status}
              onClick={submitStoryHandler}
              buttonText='Submit'
            />
            {sharedLink && <Link className={styles.shareLink} href={sharedLink}>Share a story</Link>}
          </div>
        )}
        {status === 'error' && <p className={styles.loader}>No data found</p>}
      </div>
    </main>
  )
}
export default GenerateStory
