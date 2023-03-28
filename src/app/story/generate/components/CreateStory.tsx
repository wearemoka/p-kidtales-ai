'use client'

import React, { useState } from 'react'
import { ages, characters } from '@/app/service/constants/StoryParams'
import styles from './components.module.css'
import SelectInput from '@/app/components/SelectInput/SelectInput'
import { CustomInput } from '@/app/components/Input/Input'
import { createAiStory } from '@/app/service/ChatGPTService'
import { addDocumentInFireStore } from '@/app/service/FirebaseService'
import { createSlugWithTimeStamp, getStoryTitle } from '@/app/utils/helper'

interface CharacterAttr {
  age: string
  type: string
  name: string
}
const CreateStory = () => {
  const [answer, setAnswer] = React.useState('')
  const [status, setStatus] = useState('pending')
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const [characterAttr, setCharacterAttr] = useState<CharacterAttr>({
    age: ages[0],
    type: characters[0],
    name: ''
  })

  const { age, type, name } = characterAttr

  const handlerChange = (value: string, name: string) => {
    setCharacterAttr((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const createMarkup = () => {
    const splitAnswer = answer?.split('\n').filter((text: string) => text !== '')
    return splitAnswer.map((text: string, index: number) => <p key={`${index}`}>{text}</p>)
  }

  const handleClickTellMe = async () => {
    setAnswer('')
    setStatus('process')
    createAiStory(age, name, type).then(
      (res) => {
        setStatus('success')
        setAnswer(res.choices[0].message.content)
        const storyTitle = getStoryTitle(res?.choices[0]?.message?.content)
        const slug = createSlugWithTimeStamp(storyTitle)
        addDocumentInFireStore(fireBaseStoryCollection, {
          title: storyTitle,
          slug,
          prompt: [age, name, type],
          story: res?.choices[0]?.message?.content
        })
      },
      (err) => {
        console.log('e', err)
      }
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <h4>Create a story</h4>
        <SelectInput
          label='age'
          classes={styles.selectors}
          value={characterAttr.age}
          name='age'
          options={ages}
          onChangeHandler={handlerChange}
        />
        <SelectInput
          label='character type'
          classes={styles.selectors}
          value={characterAttr.type}
          name='type'
          options={characters}
          onChangeHandler={handlerChange}
        />
        <CustomInput
          label='character name'
          value={characterAttr.name}
          type='text'
          placeHolder='Enter a name'
          name='name'
          onChange={handlerChange}
        />
      </div>
      <div className={styles.row}>
        <button disabled={status === 'process'} onClick={handleClickTellMe} className={styles.button}>Tell Me!</button>
      </div>
      <div className={styles.row}>
        {status === 'process' && <p>Loading...</p>}
        {answer && createMarkup()}
      </div>
    </div>
  )
}

export default CreateStory
