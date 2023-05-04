import { useGlobalContext } from '@/app/context/store'
import { getRandomValue } from '@/app/utils/helper'
import { IOptions } from '@/app/utils/interfaces'
import { Button, Image } from '@chakra-ui/react'

interface Props {
    options: IOptions[],
    saveOn: string,
    actionAfterSave?: () => void
}

function RandomButton ({ options, saveOn, actionAfterSave }: Props) {
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
    <div>
      <Button
        variant='ghost'
        onClick={buttonDiceHandler}
      >
        <Image src='/icons/Dice.svg' alt='dice' />
      </Button>
    </div>
  )
}

export default RandomButton
