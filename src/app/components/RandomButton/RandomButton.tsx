import { useGlobalContext } from '@/app/context/store'
import { getRandomValue } from '@/app/utils/helper'
import { IOptions } from '@/app/utils/interfaces'
import { Button, Image } from '@chakra-ui/react'
import styles from './RandomButton.module.scss'

interface Props {
    options: IOptions[],
    saveOn: string,
    className?: string,
    actionAfterSave?: () => void
}

function RandomButton ({ options, saveOn, className, actionAfterSave }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const buttonDiceHandler = () => {
    const randomValue: string = getRandomValue(options, 'label')

    const prompt = { ...globalPrompt, [saveOn]: randomValue }
    prompt.step = globalPrompt.step + 1
    setGlobalPrompt(prompt)

    if (actionAfterSave) {
      actionAfterSave()
    }
  }

  return (
    <Button
      variant='ghost'
      onClick={buttonDiceHandler}
      className={`${styles.randomButton} ${className}`}
    >
      <Image src='/icons/Dice.svg' alt='dice' />
    </Button>
  )
}

export default RandomButton
