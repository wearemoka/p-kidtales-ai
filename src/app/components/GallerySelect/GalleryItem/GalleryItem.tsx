import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'
import { IOptions } from '@/app/utils/interfaces'
import Image from 'next/image'
import React from 'react'

interface Props {
  option: IOptions,
  saveOn: string
}
function GalleryItem ({ option, saveOn }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const onOptionClick = () => {
    const newStep:any = { ...globalPrompt }
    const index = saveOn as keyof typeof globalPrompt
    newStep[index] = option.label
    if (globalPrompt.step !== PROMPT_STEPS.LESSON) {
      newStep.step = globalPrompt.step + 1
    }
    setGlobalPrompt(newStep)
  }

  return (
    <button onClick={onOptionClick}>
      {(option.imgPath && option.alt) &&
        <Image
          src={option.imgPath}
          alt={option.alt}
          width={100}
          height={100}
        />}
      <label>{option.label}</label>
    </button>
  )
}

export default GalleryItem
