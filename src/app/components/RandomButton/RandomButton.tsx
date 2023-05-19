import { useGlobalContext } from '@/app/context/store'
import { getRandomValue } from '@/app/utils/helper'
import { Button, Image } from '@chakra-ui/react'
import styles from './RandomButton.module.scss'
import { characterOpts, lessonOpts, namesOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'

interface Props {
    className?: string,
    actionAfterSave?: () => void
}

function RandomButton ({ className, actionAfterSave }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const buttonDiceHandler = () => {
    let prompt = { ...globalPrompt }

    const options = {
      character: characterOpts,
      name: namesOpts,
      scenario: scenarioOpts,
      lesson: lessonOpts
    }

    let key: keyof typeof globalPrompt
    for (key in globalPrompt) {
      if (!prompt[key] && key !== 'age') {
        const key2 = key as keyof typeof options
        const optionsValues = options[key2]
        const randomValue: string = getRandomValue(optionsValues, 'label')
        prompt = { ...prompt, [key]: randomValue }
      }
    }

    prompt.step = PROMPT_STEPS.LESSON
    setGlobalPrompt(prompt)

    if (prompt.age && actionAfterSave) {
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
