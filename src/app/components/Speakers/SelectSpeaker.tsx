'use client'
import DeviceReader from '@/app/components/Speakers/DeviceReader'
import EdenaiReader from '@/app/components/Speakers/EdenaiReader'
import LovoReader from '@/app/components/Speakers/LovoReader'
import { useState } from 'react'
import styles from './generate.module.css'

function SelectSpeaker () {
  const [reader, setReader] = useState('deviceReader')

  return (
    <>
      <select
        value={reader}
        onChange={(e) => {
          setReader(e.target.value)
        }}
      >
        <option value='deviceReader'>device Reader</option>
        <option value='edenaiReader'>edenai Reader</option>
        <option value='lovoReader'>lovo Reader</option>
      </select>

      {(reader === 'deviceReader') &&
        <div className={styles.row}>
          <p>This example uses the Reader operating system </p>
          <DeviceReader />
        </div>}

      {(reader === 'edenaiReader') &&
        <div className={styles.row}>
          <div>
            This example uses a API with AI.
            <br />First Push Load Edenai AI
          </div>
          <EdenaiReader />
        </div>}

      {(reader === 'lovoReader') &&
        <div className={styles.row}>
          <div>
            This example uses a API with AI. It has a limit of 500 characters. So you have to pass the text in sections.'
            <br />First Push Load Lovo AI
          </div>
          <LovoReader />
        </div>}
    </>
  )
}

export default SelectSpeaker
