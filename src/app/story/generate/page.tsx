import Illustration from '@/app/components/generators/Illustration'
import PreSelectedHistory from '@/app/components/generators/PreSelectedHistory'
import DeviceReader from '@/app/components/Speakers/DeviceReader'
import EdenaiReader from '@/app/components/Speakers/EdenaiReader'
import RandomStory from '../random/RandomStory'
import styles from './generate.module.css'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function StoryFormPage () {
  const text = 'this is the story of two dogs in a cave'

  return (

    <main className={styles.main}>
      <h2 className={styles.title}>Generate a Story</h2>

      <PreSelectedHistory />
      <hr />

      <RandomStory />
      <hr />

      <Illustration />
      <hr />

      <h2 className={styles.title}>Readers</h2>

      <div className={styles.row}>
        <p>This example uses the Reader operating system </p>
        <DeviceReader text={text} />
      </div>

      <hr />

      <div className={styles.row}>
        <div>
          This example uses a API with AI.
          <br />First Push Load Edenai AI
        </div>
        <EdenaiReader text={text} />
      </div>

    </main>
  )
}

export default StoryFormPage
