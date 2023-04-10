'use client'

import React from 'react'
import styles from './components.module.css'

// Generic component to request a story in written format.
function History () {
  const [answer, setAnswer] = React.useState('')

  async function handleClickTellMe () {
    const inputElem = document?.querySelector('#inputAboutStory') as HTMLInputElement
    const about = inputElem.value

    const response = await fetch('/api/AIStory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ about })
    })

    const jsonResponse = await response.json()
    console.log(jsonResponse)
    setAnswer(jsonResponse.res)
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Tell me a story about...
      </div>

      <div className={styles.row}>
        <input id='inputAboutStory' name='inputAboutStory' type='text' placeholder='a dog with a sword' />
        <button onClick={handleClickTellMe}>Tell Me!</button>
      </div>

      <div className={styles.row}>
        {answer}
      </div>
    </div>
  )
}

export default History
