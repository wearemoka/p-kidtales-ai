'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '@/app/context/store'

const EdenaiReader = () => {
  const { BGMusic, setBGMusic, globalStory, setGlobalStory } = useGlobalContext()
  const [BGMusicPrevState, setBGMusicPrevState] = useState(BGMusic)
  const [audioSrc, setAudioSrc] = useState<string | undefined>()
  const [providers, setProviders] = useState('microsoft')
  const [gender, setGender] = useState('FEMALE')

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (globalStory.storyPaged[globalStory.currentPage]) {
      handleClick()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStory])

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.play()
    }
  }, [audioSrc])

  const handleClick = async () => {
    const bodyRequest = {
      text: globalStory.storyPaged[globalStory.currentPage],
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
        ref={audioRef}
        src={audioSrc}
        onPlay={() => {
          setBGMusicPrevState(BGMusic)
          setBGMusic(false)
        }}
        onPause={() => {
          setBGMusic(BGMusicPrevState)
        }}
        onEnded={() => {
          setBGMusic(BGMusicPrevState)
          if (globalStory.currentPage < globalStory.storyPaged.length) {
            const tmpStory = { ...globalStory }
            tmpStory.currentPage = globalStory.currentPage + 1
            setGlobalStory(tmpStory)
          }
        }}
      />
    </>
  )
}

export default EdenaiReader
