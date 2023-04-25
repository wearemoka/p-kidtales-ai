'use client'
import GallerySelect from '@/app/components/GallerySelect/GallerySelect'
import NameSelect from '@/app/components/NameSelect/NameSelect'
import { useGlobalContext } from '@/app/context/store'
import UserPrompt from '@/app/components/UserPrompt/UserPrompt'
import { characterOpts, lessonOpts, PROMPT_STEPS, scenarioOpts } from '@/app/utils/constants'

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

      {/* Display the User prompt */}
      <UserPrompt promptOptions={globalPrompt} steps={PROMPT_STEPS} />

      {/* Display Character options */}
      {globalPrompt.step === PROMPT_STEPS.CHARACTER && <GallerySelect title='Select a character' options={characterOpts} saveOn='character' />}

      {/* Display Name input */}
      {globalPrompt.step === PROMPT_STEPS.NAME && <NameSelect title='Name your character' saveOn='name' />}

      {/* Display Scensario options */}
      {globalPrompt.step === PROMPT_STEPS.SCENARIO && <GallerySelect title='Select a scenario' options={scenarioOpts} saveOn='scenario' />}

      {/* Display Lesson options */}
      {globalPrompt.step === PROMPT_STEPS.LESSON && <GallerySelect title='Select a lesson' options={lessonOpts} saveOn='lesson' />}
    </div>
  )
}
export default StoryPage
