'use client'
import React, { useState } from 'react'

interface Props {
  text: String,
}

const EdenaiReader = ({ text }: Props) => {
  const [audioSrc, setAudioSrc] = useState()
  const [providers, setProviders] = useState('microsoft')
  const [gender, setGender] = useState('FEMALE')

  const handleClick = async () => {
    const bodyRequest = {
      text,
      providers,
      language: 'en',
      option: gender
    }

    const res = await fetch('/api/speakers/edenai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    })

    const data = await res.json()
    setAudioSrc(data.res[providers].audio_resource_url)
  }

  return (
    <>
      <select
        value={providers}
        onChange={(e) => {
          setProviders(e.target.value)
        }}
      >
        <option value='microsoft'>Microsoft</option>
        <option value='google'>Google</option>
        <option value='lovoai'>Lovoai</option>
        <option value='ibm'>IBM</option>
        <option value='amazon'>Amazon</option>
      </select>

      <select
        value={gender}
        onChange={(e) => {
          setGender(e.target.value)
        }}
      >
        <option value='FEMALE'>FEMALE</option>
        <option value='MALE'>MALE</option>
      </select>

      <button onClick={handleClick}>Load Edenai AI</button>

      <audio
        controls
        src={audioSrc}
      />

    </>
  )
}

export default EdenaiReader
