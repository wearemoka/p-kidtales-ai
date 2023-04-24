'use client'
import { useGlobalContext } from '@/app/context/store'
import React, { useEffect, useRef } from 'react'

function BGMusicPlayer () {
  const { BGMusic, setBGMusic } = useGlobalContext() // global background music
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      BGMusic ? audioRef.current.play() : audioRef.current.pause()
    }
  }, [BGMusic])

  return (
    <div>
      <audio
        id='bgMusicPlayer'
        controls
        loop
        src='https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/SalmonLikeTheFish/Music_for_the_Sleepy_Traveler/SalmonLikeTheFish_-_03_-_Glacier.mp3'
        ref={audioRef}
        onPlay={() => setBGMusic(true)}
        onPause={() => setBGMusic(false)}
      />
    </div>
  )
}

export default BGMusicPlayer
