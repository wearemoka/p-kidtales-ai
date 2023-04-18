import Illustration from '@/app/components/generators/Illustration'
import PreSelectedHistory from '@/app/components/generators/PreSelectedHistory'
import SelectSpeaker from '@/app/components/Speakers/SelectSpeaker'
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import RandomStory from '../random/RandomStory'
import styles from './generate.module.css'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function StoryFormPage () {
  return (

    <main className={styles.main}>

      <h2 className={styles.title}>Your story</h2>
      <StoryPagination />
      <hr />

      <h2 className={styles.title}>Generate a Story</h2>

      <PreSelectedHistory />
      <hr />

      <RandomStory />
      <hr />

      <Illustration />
      <hr />

      <h2 className={styles.title}>Readers</h2>

      <SelectSpeaker />

    </main>
  )
}

export default StoryFormPage
