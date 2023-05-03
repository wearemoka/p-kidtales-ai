import { useGlobalContext } from '@/app/context/store'
import { IUserPromptSelection } from '@/app/utils/interfaces'
import { useEffect, useState } from 'react'
import AgeSelector from '../AgeSelector/AgeSelector'
import styles from './userprompt.module.scss'
import { Box, Text } from '@chakra-ui/react'

interface Props {
    promptOptions: IUserPromptSelection,
    steps: any
}

function UserPrompt ({ promptOptions, steps }: Props) {
  const { step, character, name, scenario, lesson } = promptOptions
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const [editAge, setEditAge] = useState<boolean>(false)
  const [age, setAge] = useState<string>('')

  // Go to a specific step to change the selection
  const jumpToStepHandler = (step:any) => {
    const gp = { ...globalPrompt, step }
    setGlobalPrompt(gp)
  }

  useEffect(() => {
    if (age) {
      const gp = { ...globalPrompt, age }
      setGlobalPrompt(gp)
      setEditAge(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age])

  return (
    <div className={styles.prompt}>
      <Box mb={8}>
        <Text className='body_big' textAlign='center' mb={2}>
          Create a story for <span onClick={() => { setEditAge(true) }}>{globalPrompt.age || '...'}</span>
        </Text>

        {editAge && <AgeSelector age={age} setAge={setAge} />}
      </Box>

      <Box className='big-lead' mb={4}>
        <Text textAlign='center' className={`${step === steps.CHARACTER ? styles.active : ''} ${character ? styles.seted : styles.unseted}`}>
          Once upon a time a <span onClick={() => { jumpToStepHandler(steps.CHARACTER) }}>{character || '...'}</span>
        </Text>

        <Text textAlign='center' className={`${step === steps.NAME ? styles.active : ''} ${name ? styles.seted : styles.unseted}`}>
          Called <span onClick={() => { jumpToStepHandler(steps.NAME) }}>{name || '...'} </span>
        </Text>

        <Text textAlign='center' className={`${step === steps.SCENARIO ? styles.active : ''} ${scenario ? styles.seted : styles.unseted}`}>
          had an amazing adventure in the  <span onClick={() => { jumpToStepHandler(steps.SCENARIO) }}>{scenario || '...'}</span>
        </Text>

        <Text textAlign='center' className={`${step === steps.LESSON ? styles.active : ''} ${lesson ? styles.seted : styles.unseted}`}>
          to learn about  <span onClick={() => { jumpToStepHandler(steps.LESSON) }}>{lesson || '...'}</span>
        </Text>
      </Box>
    </div>
  )
}

export default UserPrompt
