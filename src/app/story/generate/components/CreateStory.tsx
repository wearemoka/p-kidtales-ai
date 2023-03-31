'use client'

import React, { useState } from 'react'
import { ages, characters } from '@/app/service/constants/StoryParams'
import styles from './components.module.css'
import SelectInput from '@/app/components/SelectInput/SelectInput'
import { CustomInput } from '@/app/components/Input/Input'
import { getAiStory } from '@/app/service/ChatGPTService'
import { addDocumentInFireStore } from '@/app/service/FirebaseService'
import { createSlugWithTimeStamp, getStoryTitle } from '@/app/utils/helper'
import { TextArea } from '@/app/components/TextArea/TextArea'

interface CharacterAttr {
  age: string
  type: string
  name: string
  lesson: string
}
const CreateStory = () => {
  const [answer, setAnswer] = React.useState('')
  const [status, setStatus] = useState('pending')
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const [characterAttr, setCharacterAttr] = useState<CharacterAttr>({
    age: ages[0],
    type: characters[0],
    name: '',
    lesson: ''
  })

  const { age, type, name, lesson } = characterAttr

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
    return splitAnswer.map((text: string, index: number) => <p className={styles.storyDescription} key={`${index}`}>{text}</p>)
  }

  const handleClickTellMe = async () => {
    setAnswer('')
    setStatus('process')
    const content = `Generate a story about a ${type} whose name should be ${name}. It should have the potential to capture ${age} years old child's attention and imagination and child should learn the lesson of ${lesson} from the story. Be creative and feel free to add any other details or plot twists that you think would make the story interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
    getAiStory(content).then(
      (res) => {
        setStatus('success')
        setAnswer(res.choices[0].message.content)
        const storyTitle = getStoryTitle(res?.choices[0]?.message?.content)
        const slug = createSlugWithTimeStamp(storyTitle)
        addDocumentInFireStore(fireBaseStoryCollection, {
          title: storyTitle,
          slug,
          prompt: [age, name, type, lesson],
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
        <br />
        <TextArea
          label='lesson'
          value={lesson}
          name='lesson'
          placeHolder='Enter a lesson'
          onChange={handlerChange}
        />
      </div>
      <div className={styles.row}>
        <button disabled={status === 'process' || !name} onClick={handleClickTellMe} className={styles.button}>Tell Me!</button>
      </div>
      <div className={styles.row}>
        {status === 'process' && <p>Loading...</p>}
        {answer && createMarkup()}
      </div>
    </div>
  )
}

export default CreateStory
