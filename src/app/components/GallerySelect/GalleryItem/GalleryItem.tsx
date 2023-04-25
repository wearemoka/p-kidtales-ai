import { useGlobalContext } from '@/app/context/store'
import Image from 'next/image'
import React from 'react'
interface IOptions {
  label: string,
  imgPath?: string,
  alt?: string
}

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
