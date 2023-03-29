'use client'
import React, { useEffect, useRef } from 'react'

function AudioPlayer () {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
    }
  }, [])

  return (
    <div>
      <audio
        id='audioPlayer'
        controls
        src='https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/SalmonLikeTheFish/Music_for_the_Sleepy_Traveler/SalmonLikeTheFish_-_03_-_Glacier.mp3'
        ref={audioRef}
      />
    </div>
  )
}

export default AudioPlayer
