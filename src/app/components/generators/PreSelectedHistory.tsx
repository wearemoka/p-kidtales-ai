'use client'

import React, { useEffect, useState } from 'react'
import { getAiStory, getAiStoryWithStreamBE } from '@/app/services/ChatGPTService'
import { ages, characters, adventures, places } from '@/app/services/constants/StoryParams'
import styles from './components.module.css'
import { createSlugWithTimeStamp, getStoryTitle } from '@/app/utils/helper'
import { addDocumentInFireStore } from '@/app/services/FirebaseService'
import Button from '@/app/components/Story/Button/Button'
import { LoadingMessages } from '@/app/utils/constants'

const article = (char: String) => (['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())) ? 'an' : 'a'

// Generic component to request a story in written format.
// you can choice options from a selectors
function PreSelectedHistory () {
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

  const [answer, setAnswer] = useState<string>('Your Story will be displayed here')
  const [isCheckedStreamedAPI, setIsCheckedStreamedAPI] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [messageIndex, setMessageIndex] = useState<number>(0)

  // selected options
  const [age, setAge] = useState(ages[0])
  const [character, setCharacter] = useState(characters[0])
  const [adventure, setAdventure] = useState(adventures[0])
  const [place, setPlace] = useState(places[0])
  const [characterName, setCharacterName] = useState('')
  const [lesson, setLesson] = useState('')

  // Send the parameters to the service that communicates with
  // the AI and wait for its response to be displayed.
  async function handleClickTellMe () {
    setLoading(true)
    if (isCheckedStreamedAPI) {
      const paragraphs = 3
      await getAiStoryWithStreamBE(age, character, adventure, characterName, place, lesson, setAnswer, paragraphs, isCheckedStreamedAPI)
    } else {
      const response = await getAiStory(age, character, adventure, characterName, place, lesson)
      if (response.status === 'error') {
        setAnswer('An server error')
        setLoading(false)
        return
      }
      setAnswer(response.res)

      const storyTitle = getStoryTitle(response.res)
      const slug = createSlugWithTimeStamp(storyTitle)
      if (storyTitle && slug) {
        addDocumentInFireStore(fireBaseStoryCollection, {
          title: storyTitle,
          slug,
          prompt: [age, character, adventure, characterName, place],
          story: response.res
        })
      }
    }
    setLoading(false)
  }

  // Change message on loading times
  useEffect(() => {
    let timer

    if (loading) {
      setAnswer(LoadingMessages[messageIndex])

      timer = setTimeout(() => {
        if (messageIndex < LoadingMessages.length - 1) {
          setMessageIndex(messageIndex + 1)
          setAnswer(LoadingMessages[messageIndex + 1])
        }
      }, 5000)
    } else {
      setMessageIndex(0)
      clearTimeout(timer)
    }
  }, [loading, messageIndex])

  const handleOnChangeCheckboxStreamedAPI = () => {
    setIsCheckedStreamedAPI(!isCheckedStreamedAPI)
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Tell me a story for children

        <select
          className={styles.selectors}
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
          }}
        >
          {ages.map(e => <option key={`opt-age-${e}`} value={e}>{e}</option>)}
        </select>

        years-old about

        <select
          className={styles.selectors}
          value={character}
          onChange={(e) => {
            setCharacter(e.target.value)
          }}
        >
          {characters.map(e => <option key={`opt-character-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

        named

        <input
          type='text'
          value={characterName}
          placeholder='Enter a name'
          name='name'
          onChange={(e) => {
            setCharacterName(e.target.value)
          }}
        />

        who embarks on {article(adventure.charAt(0))}

        <select
          className={styles.selectors}
          value={adventure}
          onChange={(e) => {
            setAdventure(e.target.value)
          }}
        >
          {adventures.map(e => <option key={`opt-adventure-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

        in {article(place.charAt(0))}

        <select
          className={styles.selectors}
          value={place}
          onChange={(e) => {
            console.log(e.target.value)
            setPlace(e.target.value)
          }}
        >
          {places.map(e => <option key={`opt-place-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

        <input
          type='text'
          value={lesson}
          placeholder='Lesson'
          name='lesson'
          onChange={(e) => {
            setLesson(e.target.value)
          }}
        />

      </div>

      <div className={styles.row}>
        <div>
          <input type='checkbox' id='useStreamedAPI' name='useStreamedAPI' onChange={handleOnChangeCheckboxStreamedAPI} /> use Streamed API
        </div>
        <Button enabled={!loading} onClick={handleClickTellMe} buttonText='Get a story' />
      </div>

      <div className={styles.row}>
        {answer}
      </div>
    </div>
  )
}

export default PreSelectedHistory
