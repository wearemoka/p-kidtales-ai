'use client'
import GallerySelect from '../components/GallerySelect/GallerySelect'
import { useGlobalContext } from '../context/store'
import styles from './page.module.scss'

const PROMPT_STEPS = {
  CHARACTER: 1,
  NAME: 2,
  SCENARIO: 3,
  LESSON: 4
}

const characterOpts = [
  { label: 'Giraffe', imgPath: '/thirteen.svg', alt: 'Giraffe' },
  { label: 'Whale', imgPath: '/thirteen.svg', alt: 'Whale' },
  { label: 'Dog', imgPath: '/thirteen.svg', alt: 'Dog' },
  { label: 'Rabbit', imgPath: '/thirteen.svg', alt: 'Rabbit' }
]

const scenarioOpts = [
  { label: 'Ocean', imgPath: '/thirteen.svg', alt: 'Ocean' },
  { label: 'Jungle', imgPath: '/thirteen.svg', alt: 'Jungle' },
  { label: 'Castle', imgPath: '/thirteen.svg', alt: 'Castle' },
  { label: 'Moon', imgPath: '/thirteen.svg', alt: 'Moon' }
]
const lessonOpts = [
  { label: 'Friendship' },
  { label: 'Family' },
  { label: 'Inclusivity' },
  { label: 'Respect' }
]

const StoryPage = () => {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()

  const clickChangeStep = (change:number) => {
    const newStep = globalPrompt.step + change
    const gp = { ...globalPrompt, step: newStep }
    setGlobalPrompt(gp)
  }

  return (
    // Remove this style
    <div className='dark'>

      <div>
        <h3>Only for devs</h3>
        <button onClick={() => clickChangeStep(-1)}>Back </button>
        <button onClick={() => clickChangeStep(+1)}>Next </button>
        <hr />
      </div>

      <div>Create a story for a 3-5yrs</div>

      <div className={globalPrompt.step === PROMPT_STEPS.CHARACTER ? styles.active : ''}>Once upon a time a ...</div>
      <div className={globalPrompt.step === PROMPT_STEPS.NAME ? styles.active : ''}>Called...</div>
      <div className={globalPrompt.step === PROMPT_STEPS.SCENARIO ? styles.active : ''}>had an amazing adventure in the ...</div>
      <div className={globalPrompt.step === PROMPT_STEPS.LESSON ? styles.active : ''}>to learn about ...</div>

      {/* Display Character options */}
      {globalPrompt.step === PROMPT_STEPS.CHARACTER && <GallerySelect title='Select a character' options={characterOpts} />}

      {/* Display Name input */}
      {globalPrompt.step === PROMPT_STEPS.NAME && <input type='text' name='text' />}

      {/* Display Scensario options */}
      {globalPrompt.step === PROMPT_STEPS.SCENARIO && <GallerySelect title='Select a scenario' options={scenarioOpts} />}

      {/* Display Lesson options */}
      {globalPrompt.step === PROMPT_STEPS.LESSON && <GallerySelect title='Select a lesson' options={lessonOpts} />}
    </div>
  )
}
export default StoryPage
