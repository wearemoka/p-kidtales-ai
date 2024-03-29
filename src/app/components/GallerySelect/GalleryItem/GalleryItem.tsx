import { useGlobalContext } from '@/app/context/store'
import { PROMPT_STEPS } from '@/app/utils/constants'
import { IOptions } from '@/app/utils/interfaces'
import Image from 'next/image'
import styles from './GalleryItem.module.scss'

interface Props {
  option: IOptions,
  saveOn: string,
  afterClickHandler?:any,
  value?: string,
}
function GalleryItem ({ option, saveOn, afterClickHandler, value }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const onOptionClick = () => {
    const newStep:any = { ...globalPrompt }
    const index = saveOn as keyof typeof globalPrompt
    newStep[index] = option.label
    if (globalPrompt.step !== PROMPT_STEPS.LESSON) {
      newStep.step = globalPrompt.step + 1
    }
    setGlobalPrompt(newStep)

    // if the function is defined, run it
    if (afterClickHandler) {
      afterClickHandler()
    }
  }

  return (
    <button onClick={onOptionClick} className={`${styles.cardGallery} ${value === 'noImg' ? styles.noImg : ''}`}>
      {(option.imgPath && option.alt) &&
        <Image
          src={option.imgPath}
          alt={option.alt}
          width={100}
          height={100}
        />}
      <label className='body'>{option.label}</label>
    </button>
  )
}

export default GalleryItem
