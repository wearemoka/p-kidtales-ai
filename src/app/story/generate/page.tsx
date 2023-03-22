'use client'
import styles from './page.module.css'
import Button from '@/app/components/Story/Button/Button'
import { useState } from 'react'
import { ages, characters, adventures, places } from '../../service/constants/StoryParams'
import { getAiStory } from '../../service/ChatGPTService'
import { addDocumentInFireStore } from '../../service/FirebaseService'

type StoryParams = string[]
/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function GenerateStory () {
  const [answer, setAnswer] = useState({
    role: '',
    content: ''
  })
  const [status, setStatus] = useState('pending')

  const generateRandomIndex = (data: StoryParams) => {
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  }

  const handlerClickOnGenerateRandomStory = () => {
    setStatus('process')
    const randomAge = generateRandomIndex(ages)
    const randomCharacters = generateRandomIndex(characters)
    const randomAdventures = generateRandomIndex(adventures)
    const randomPlace = generateRandomIndex(places)
    getAiStory(randomAge, randomCharacters, randomAdventures, randomPlace).then(
      async (res) => {
        const endPoint = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_END_POINT as string
        setStatus('success')
        setAnswer((preViewState) => {
          return {
            ...preViewState,
            role: res.choices[0].message.role,
            content: res.choices[0].message.content
          }
        })
        addDocumentInFireStore(endPoint, {
          story: res.choices[0].message.content
        })
      },
      (err) => {
        setStatus('error')
        console.log('e', err)
      }
    )
  }
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Generate random story</h2>
      <Button status={status} onClick={handlerClickOnGenerateRandomStory} buttonText='Generate random story' />
      <div className={styles.answerContainer}>
        {status === 'pending' && <h4 className={styles.loader}>Your story display here</h4>}
        {status === 'process' && <h4 className={styles.loader}>Loading...</h4>}
        {status === 'success' &&
          <div className={styles.loader}>
            <p className={styles.description}>{answer.content}</p>
          </div>}
        {status === 'error' && <p className={styles.loader}>No data found</p>}
      </div>
    </main>
  )
}

export default GenerateStory
