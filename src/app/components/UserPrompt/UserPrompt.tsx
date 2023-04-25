import { useGlobalContext } from '@/app/context/store'
import { IUserPromptSelection } from '@/app/utils/interfaces'
import styles from './userprompt.module.scss'

interface Props {
    promptOptions: IUserPromptSelection,
    steps: any
}

function UserPrompt ({ promptOptions, steps }: Props) {
  const { step, character, name, scenario, lesson } = promptOptions
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  // Go to a specific step to change the selection
  const jumpToStepHandler = (step:any) => {
    const gp = { ...globalPrompt, step }
    setGlobalPrompt(gp)
  }

  return (
    <>
      <div className={step === steps.CHARACTER ? styles.active : ''}>
        Once upon a time a <span onClick={() => { jumpToStepHandler(steps.CHARACTER) }}>{character || '...'}</span>
      </div>

      <div className={step === steps.NAME ? styles.active : ''}>
        Called <span onClick={() => { jumpToStepHandler(steps.NAME) }}>{name || '...'}</span>
      </div>
      <div className={step === steps.SCENARIO ? styles.active : ''}>
        had an amazing adventure in the  <span onClick={() => { jumpToStepHandler(steps.SCENARIO) }}>{scenario || '...'}</span>
      </div>
      <div className={step === steps.LESSON ? styles.active : ''}>
        to learn about  <span onClick={() => { jumpToStepHandler(steps.LESSON) }}>{lesson || '...'}</span>
      </div>
    </>
  )
}

export default UserPrompt
