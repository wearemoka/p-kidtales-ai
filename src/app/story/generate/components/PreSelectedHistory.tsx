'use client'

import React, { useState } from 'react'
import { getAiStory, getAiStoryWithStream } from '../services/services'
import { ages, characters, adventures, places } from '@/app/service/constants/StoryParams'
import styles from './components.module.css'

const article = (char: String) => (['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())) ? 'an' : 'a'

// Generic component to request a story in written format.
// you can choice options from a selectors
function PreSelectedHistory () {
  const [answer, setAnswer] = React.useState('')
  const [isCheckedStreamedAPI, setIsCheckedStreamedAPI] = useState(false)
  // selected options
  const [age, setAge] = React.useState(ages[0])
  const [character, setCharacter] = React.useState(characters[0])
  const [adventure, setAdventure] = React.useState(adventures[0])
  const [place, setPlace] = React.useState(places[0])

  // Send the parameters to the service that communicates with
  // the AI and wait for its response to be displayed.
  async function handleClickTellMe () {
    if (isCheckedStreamedAPI) {
      await getAiStoryWithStream(age, character, adventure, place, setAnswer)
    } else {
      getAiStory(age, character, adventure, place).then(
        (res) => { setAnswer(res.choices[0].message.content) },
        (err) => { console.log('error', err) }
      )
    }
  }

  const handleOnChangeCheckboxStreamedAPI = () => {
    setIsCheckedStreamedAPI(!isCheckedStreamedAPI)
  }

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        Tell me a story about a

        <select
          className={styles.selectors}
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
          }}
        >
          {ages.map(e => <option key={`opt-age-${e}`} value={e}>{e}</option>)}
        </select>

        years-old

        <select
          className={styles.selectors}
          value={character}
          onChange={(e) => {
            setCharacter(e.target.value)
          }}
        >
          {characters.map(e => <option key={`opt-character-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

        who embarks on {article(adventure.charAt(0))}

        <select
          className={styles.selectors}
          value={adventure}
          onChange={(e) => {
            setAdventure(e.target.value)
          }}
        >
          {adventures.map(e => <option key={`opt-adventure-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

        in {article(place.charAt(0))}

        <select
          className={styles.selectors}
          value={place}
          onChange={(e) => {
            console.log(e.target.value)
            setPlace(e.target.value)
          }}
        >
          {places.map(e => <option key={`opt-place-${e}`} value={e}>{e.toLowerCase()}</option>)}
        </select>

      </div>

      <div className={styles.row}>
        <div>
          <input type='checkbox' id='useStreamedAPI' name='useStreamedAPI' onChange={handleOnChangeCheckboxStreamedAPI} /> use Streamed API
        </div>
        <button onClick={handleClickTellMe} className={styles.button}>Tell Me!</button>
      </div>

      <div className={styles.row}>
        {answer}
      </div>
    </div>
  )
}

export default PreSelectedHistory
