import { useGlobalContext } from '@/app/context/store'
import { IUserPromptSelection } from '@/app/utils/interfaces'
import { useEffect, useState } from 'react'
import AgeSelector from '../AgeSelector/AgeSelector'
import styles from './userprompt.module.scss'
import { Box, Stack, Text } from '@chakra-ui/react'
import { PROMPT_STEPS } from '@/app/utils/constants'

interface Props {
    promptOptions: IUserPromptSelection,
    steps: any
}

function UserPrompt ({ promptOptions, steps }: Props) {
  const { step, character, name, scenario, lesson } = promptOptions
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const [editAge, setEditAge] = useState<boolean>(false)
  const [age, setAge] = useState<string>(globalPrompt.age)

  // Go to a specific step to change the selection
  const jumpToStepHandler = (step:any) => {
    const keys = Object.keys(globalPrompt) // valid keys
    const k = keys[step] as keyof typeof globalPrompt // current step

    if (
      step <= globalPrompt.step ||
      (step > globalPrompt.step && globalPrompt[k])
    ) {
      const gp = { ...globalPrompt, step }
      setGlobalPrompt(gp)
    }
  }

  const blurArray = ['noBlur', 'blur1', 'blur2', 'blur3']

  // set the Age or display options to select it
  useEffect(() => {
    if (age) {
      const gp = { ...globalPrompt, age }

      if (gp.age && gp.character && gp.name && gp.scenario && gp.lesson) {
        gp.step = PROMPT_STEPS.GENERATION
      }

      setGlobalPrompt(gp)
      setEditAge(false)
    } else {
      setEditAge(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age])

  return (
    <div className={styles.prompt}>
      <Box mb={8}>
        <Text className='body_big' textAlign='center' mb={2}>
          Creating a story for <span onClick={() => { setEditAge(true) }}>{globalPrompt.age || '...'}</span> years
        </Text>

        {editAge &&
          <>
            <AgeSelector age={age} setAge={setAge} openOptions={setEditAge} />
            <Text className='body_big' textAlign='center' mt={2}>
              Age is required to generate an appropriate story
            </Text>
          </>}
      </Box>

      <Box className='big-lead' mb={8}>
        <Stack direction={{ lg: 'row', base: 'column' }} justify='center'>
          <Text textAlign='center' className={`${blurArray[steps.CHARACTER - step] ?? ''} ${step === steps.CHARACTER ? styles.active : ''} ${character ? styles.seted : styles.unseted}`}>
            Once upon a time there was a <span onClick={() => { jumpToStepHandler(steps.CHARACTER) }}>{character || '...'}</span>
          </Text>

          <Text textAlign='center' className={`${blurArray[steps.NAME - step] ?? ''} ${step === steps.NAME ? styles.active : ''} ${name ? styles.seted : styles.unseted}`}>
            called <span onClick={() => { jumpToStepHandler(steps.NAME) }}>{name || '...'} </span>
          </Text>
        </Stack>

        <Stack direction={{ lg: 'row', base: 'column' }} justify='center'>
          <Text textAlign='center' className={`${blurArray[steps.SCENARIO - step] ?? ''} ${step === steps.SCENARIO ? styles.active : ''} ${scenario ? styles.seted : styles.unseted}`}>
            who had an amazing adventure in the  <span onClick={() => { jumpToStepHandler(steps.SCENARIO) }}>{scenario || '...'}</span>
          </Text>

          <Text textAlign='center' className={`${blurArray[steps.LESSON - step] ?? ''} ${step === steps.LESSON ? styles.active : ''} ${lesson ? styles.seted : styles.unseted}`}>
            to learn about  <span onClick={() => { jumpToStepHandler(steps.LESSON) }}>{lesson || '...'}</span>
          </Text>
        </Stack>

      </Box>
    </div>
  )
}

export default UserPrompt
