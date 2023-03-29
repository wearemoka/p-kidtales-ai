'use client'
import React, { useEffect, useRef } from 'react'

function AudioPlayer () {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [])

  return (
    <div>
      <audio
        id='audioPlayer'
        controls
        src='/music/SalmonLikeTheFish.mp3'
        ref={audioRef}
      />

      <button onClick={() => {
        if (audioRef && audioRef.current) {
          audioRef.current.volume = 0
          audioRef.current.pause()
        }
      }}
      >
        Stop & Mute
      </button>
    </div>
  )
}

export default AudioPlayer
