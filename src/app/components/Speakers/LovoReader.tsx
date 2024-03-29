'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '@/app/context/store'

const LovoReader = () => {
  const { BGMusic, setBGMusic, globalStory, setGlobalStory } = useGlobalContext()

  const [BGMusicPrevState, setBGMusicPrevState] = useState(BGMusic)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [skinVoices, setSkinVoices] = useState([])
  const [providers, setProviders] = useState('Jemima Taylor')

  useEffect(() => {
    fetch('/api/speakers/lovo/voices')
      .then((res) => res.json())
      .then((data) => {
        const voices = data.res.data
          .filter((v:any) => {
            return v.tags.some((vv:any) => {
              return (vv.content === 'British' || vv.content === 'American')
            })
          })
        setSkinVoices(voices)
      })
  }, [])

  useEffect(() => {
    if (globalStory.storyPaged[globalStory.currentPage]) {
      handleClick()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStory])

  const handleClick = async () => {
    const bodyRequest = {
      text: globalStory.storyPaged[globalStory.currentPage],
      speaker_id: providers
    }

    const res = await fetch('/api/speakers/lovo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    })

    const buffer = await res.arrayBuffer()
    const blob = new Blob([buffer], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)

    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
    }
  }

  return (
    <>
      {
      skinVoices &&
        <select
          value={providers}
          onChange={(e) => {
            setProviders(e.target.value)
          }}
        >
          {skinVoices.map((sv:any) => <option key={sv.name} value={sv.name}>{sv.name}</option>)}
        </select>
      }
      <button onClick={handleClick}>Load Lovo AI</button>
      <audio
        id='reader'
        ref={audioRef}
        controls
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

export default LovoReader
