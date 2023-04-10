'use client'

import React from 'react'
import { getAiHistory } from '@/app/services/ChatGPTService'
import styles from './components.module.css'

// Generic component to request a story in written format.
function History () {
  const [answer, setAnswer] = React.useState('')

  function handleClickTellMe () {
    const inputElem = document?.querySelector('#inputAbout') as HTMLInputElement
    const about = inputElem.value
    // Uses the service to obtain a Promise with the API response.
    getAiHistory(about).then(
      (res) => {
        console.log(res.choices[0].message.content)
        setAnswer(res.choices[0].message.content)
      },
      (err) => {
        console.log('e', err)
      }
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Tell me a story about...
      </div>

      <div className={styles.row}>
        <input id='inputAbout' name='inputAbout' type='text' placeholder='a dog with a sword' />
        <button onClick={handleClickTellMe}>Tell Me!</button>
      </div>

      <div className={styles.row}>
        {answer}
      </div>
    </div>
  )
}

export default History