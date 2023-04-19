'use client'

import React, { useState } from 'react'
import { getAiIllustration } from '@/app/services/ChatGPTService'
import styles from './components.module.scss'
import Image from 'next/image'
import Button from '../Story/Button/Button'
import { useMessageTime } from '@/app/hooks/useMessageTime'

function Illustration () {
  const [imgSrc, setImgSrc] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  function handleClickIllustrate () {
    setLoading(true)
    const inputElem = document?.querySelector('#inputAbout') as HTMLInputElement
    const about = inputElem.value

    // Uses the service to obtain a Promise with the API response.
    getAiIllustration(about).then(
      (res) => {
        setImgSrc(`data:image/jpeg;base64,${res.data[0].b64_json}`)
        setLoading(false)
      },
      (err) => {
        console.log('e', err)
        setLoading(false)
      }
    )
  }

  // Set loading messages
  const loadingMessage = useMessageTime(loading)

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Get a Illustration about...
      </div>

      <div className={styles.row}>
        <input id='inputAbout' name='inputAbout' type='text' placeholder='a dog with a sword' className={styles.input} />
        <Button enabled={!loading} onClick={handleClickIllustrate} buttonText='Illustrate' />
      </div>

      <div className={styles.row}>
        {loading && <p>{loadingMessage}</p>}

        {imgSrc &&
          <Image
            src={imgSrc}
            alt='an image generated by AI'
            width={512}
            height={512}
          />}
      </div>
    </div>
  )
}

export default Illustration
