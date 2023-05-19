'use client'
import { useGlobalContext } from '@/app/context/store'
import React, { useEffect } from 'react'

const DeviceReader = () => {
  const { BGMusic, setBGMusic, globalStory, setGlobalStory } = useGlobalContext()
  const BGMusicOriginalState = BGMusic
  const storyPaginated = globalStory.storyPaged

  const playClickButton = async () => {
    setBGMusic(false)
    try {
      const currentStoryPage = globalStory.currentPage
      await readTextWithNativeDeviceSpeaker(storyPaginated[currentStoryPage])
      setBGMusic(BGMusicOriginalState)
    } catch (e) {
      console.log('error', e)
      setBGMusic(BGMusicOriginalState)
    }
  }

  useEffect(() => {
    const currentStoryPage = globalStory.currentPage
    if (storyPaginated[currentStoryPage]) {
      playClickButton()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalStory])

  const onDeviceReaderFinish = () => {
    if (globalStory.currentPage < storyPaginated.length) {
      const tmpStory = { ...globalStory }
      tmpStory.currentPage = globalStory.currentPage + 1
      setGlobalStory(tmpStory)
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
    audio.addEventListener('end', onDeviceReaderFinish)
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
