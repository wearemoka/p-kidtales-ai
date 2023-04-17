import Illustration from '@/app/components/generators/Illustration'
import PreSelectedHistory from '@/app/components/generators/PreSelectedHistory'
import DeviceReader from '@/app/components/Speakers/DeviceReader'
import EdenaiReader from '@/app/components/Speakers/EdenaiReader'
import LovoReader from '@/app/components/Speakers/LovoReader'
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

      <div className={styles.row}>
        <p>This example uses the Reader operating system </p>
        <DeviceReader />
      </div>

      <hr />

      <div className={styles.row}>
        <div>
          This example uses a API with AI.
          <br />First Push Load Edenai AI
        </div>
        <EdenaiReader />
      </div>

      <hr />

      <div className={styles.row}>
        <div>
          This example uses a API with AI. It has a limit of 500 characters. So you have to pass the text in sections.'
          <br />First Push Load Lovo AI
        </div>
        <LovoReader />
      </div>

    </main>
  )
}

export default StoryFormPage
