import { IUserPromptSelection } from '@/app/utils/interfaces'
import styles from './userprompt.module.scss'

interface Props {
    promptOptions: IUserPromptSelection,
    steps: any
}

function UserPrompt ({ promptOptions, steps }: Props) {
  const { step, character, name, scenario, lesson } = promptOptions
  return (
    <>
      <div className={step === steps.CHARACTER ? styles.active : ''}>
        Once upon a time a <span>{character || '...'}</span>
      </div>

      <div className={step === steps.NAME ? styles.active : ''}>
        Called <span>{name || '...'}</span>
      </div>
      <div className={step === steps.SCENARIO ? styles.active : ''}>
        had an amazing adventure in the  <span>{scenario || '...'}</span>
      </div>
      <div className={step === steps.LESSON ? styles.active : ''}>
        to learn about  <span>{lesson || '...'}</span>
      </div>
    </>
  )
}

export default UserPrompt
