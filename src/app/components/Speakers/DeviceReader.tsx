'use client'
import { useGlobalContext } from '@/app/context/store'
import React from 'react'

const DeviceReader = () => {
  const { BGMusic, setBGMusic, globalStory } = useGlobalContext()
  const BGMusicOriginalState = BGMusic

  const playClickButton = async () => {
    setBGMusic(false)
    try {
      await readTextWithNativeDeviceSpeaker(globalStory)
      setBGMusic(BGMusicOriginalState)
    } catch (e) {
      console.log('error', e)
      setBGMusic(BGMusicOriginalState)
    }
  }

  /**
   * Read text with the device's native reader
   * @param text Text to read
   * @returns a promise
   */
  async function readTextWithNativeDeviceSpeaker (text:string): Promise<any> {
    const audio = new SpeechSynthesisUtterance()
    audio.text = text
    audio.rate = 0.8
    speechSynthesis.speak(audio)
    return new Promise(resolve => {
      audio.onend = resolve
    })
  }

  return (
    <button onClick={playClickButton}> Device Reader </button>
  )
}

export default DeviceReader
