'use client'
import Style from './index.module.css'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'

export interface StoryFormState {
    title: string;
    description: string;
    appropriate: boolean;
}
interface StoryFormProps {
    selectedItemTitle : string
    selectedItemDescription : string,
    selectedItemAppropriate: boolean,
    onSubmit : (value : StoryFormState) => void
    isEdit?: boolean
    message?: string
}
const Form:React.FC<StoryFormProps> = ({
  selectedItemTitle,
  selectedItemDescription,
  selectedItemAppropriate,
  onSubmit,
  isEdit = false,
  message = ''
}) => {
  const [userStoryInput, setUserStoryInput] = useState<StoryFormState>({
    title: '',
    description: '',
    appropriate: true
  })
  const { title, description, appropriate } = userStoryInput

  useEffect(() => {
    setUserStoryInput({
      title: selectedItemTitle,
      description: selectedItemDescription,
      appropriate: selectedItemAppropriate
    })
  }, [selectedItemTitle, selectedItemDescription, selectedItemAppropriate])

  const handlerChange = (e: BaseSyntheticEvent) => {
    setUserStoryInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handlerSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    onSubmit(userStoryInput)
  }

  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={(e) => handlerSubmit(e)}>
        <h1>
          {isEdit ? 'Edit Story' : 'Add Story'}
        </h1>
        <div className={Style.input} style={{ marginBottom: '5px' }}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' value={title} onChange={handlerChange} />
        </div>
        <div className='input-field'>
          <label htmlFor='description'>Description</label>
          <textarea name='description' id='description' cols={18} rows={2} value={description} onChange={handlerChange} />
        </div>
        <div>
          <label htmlFor='appropriate'>Inappropriate?</label>
          <input type='checkbox' id='appropriate' name='appropriate' checked={appropriate} onChange={(e) => setUserStoryInput({ ...userStoryInput, appropriate: e.target.checked })} />
        </div>
        <button type='submit' className={Style.button}>Submit</button>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default Form
