'use client'
import React, { useRef } from 'react'

interface Props {
  text: string;
}

const LovoReader = ({ text }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleClick = async () => {
    const bodyRequest = {
      text,
      speaker_id: 'Martha Sage'
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
      <button onClick={handleClick}>Load Lovo AI</button>
      <audio
        id='reader'
        ref={audioRef}
        controls
      />
    </>
  )
}

export default LovoReader
