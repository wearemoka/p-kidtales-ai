import Illustration from '@/app/components/generators/Illustration'
import PreSelectedHistory from '@/app/components/generators/PreSelectedHistory'
import RandomStory from '../random/RandomStory'
import styles from './generate.module.css'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function StoryFormPage () {
  return (

    <main className={styles.main}>
      <h2 className={styles.title}>Generate a Story</h2>

      <PreSelectedHistory />
      <hr />

      <RandomStory />
      <hr />

      <Illustration />

    </main>
  )
}

export default StoryFormPage
