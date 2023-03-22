import History from './components/History'
import Illustration from './components/Illustration'
import PreSelectedHistory from './components/PreSelectedHistory'
import ShareContent from './components/ShareContent'
import styles from './generate.module.css'

// Moked data to share as example
const urlToShare: string = 'http://localhost:3000/demo'
const quote: string = 'This is an AI-generated story'
const hashtags: string[] = ['#iaStory', '#bedStory', '#IA']

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function StoryFormPage () {
  return (

    <main className={styles.main}>
      <h2 className={styles.title}>Generate a Story</h2>
      <History />

      <hr />

      <Illustration />

      <hr />

      <PreSelectedHistory />

      <hr />

      <ShareContent
        urlToShare={urlToShare}
        quote={quote}
        hashtags={hashtags}
      />
    </main>
  )
}

export default StoryFormPage
