import History from "./components/History"
import Illustration from "./components/Illustration"
import PreSelectedHistory from "./components/PreSetedHistory"
import styles from './demo.module.css'

/**
 * This is a general page to show the different integrations with AI,
 * components are used.
 */
function DemoPage() {
    return <main className={styles.main}>
        <h2 className={styles.title}>This is a DemoPage</h2>
        <History />

        <hr/>

        <Illustration />

        <hr/>

        <PreSelectedHistory />

    </main>
}

export default DemoPage
