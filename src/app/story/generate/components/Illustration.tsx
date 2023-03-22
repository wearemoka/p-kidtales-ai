'use client'

import React from 'react'
import { getAiIllustration } from '../services/services'
import styles from './components.module.css'

function Illustration () {
  const [imgSrc, setImgSrc] = React.useState('')

  function handleClickIllustrate () {
    const inputElem = document?.querySelector('#inputAbout') as HTMLInputElement
    const about = inputElem.value

    // Uses the service to obtain a Promise with the API response.
    getAiIllustration(about).then(
      (res) => {
        console.log(res.data[0].url)
        setImgSrc(res.data[0].url)
      },
      (err) => {
        console.log('e', err)
      }
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Get a Illustration about...
      </div>

      <div className={styles.row}>
        <input id='inputAbout' name='inputAbout' type='text' placeholder='a dog with a sword' />
        <button onClick={handleClickIllustrate}>Illustrate</button>
      </div>

      <div className={styles.row}>
        <a href={imgSrc} target='_blank'>{imgSrc}</a>
      </div>
    </div>
  )
}

export default Illustration
