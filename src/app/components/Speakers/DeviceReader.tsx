'use client'
import { useGlobalContext } from '@/app/context/store'
import React, { useEffect } from 'react'

const DeviceReader = () => {
  const { BGMusic, setBGMusic, globalStory, currentStoryPage, setCurrentStoryPage } = useGlobalContext()
  const BGMusicOriginalState = BGMusic
  const storyPaginated = globalStory.split('\n\n').filter((value) => value !== '')

  const playClickButton = async () => {
    setBGMusic(false)
    try {
      await readTextWithNativeDeviceSpeaker(storyPaginated[currentStoryPage])
      setBGMusic(BGMusicOriginalState)
    } catch (e) {
      console.log('error', e)
      setBGMusic(BGMusicOriginalState)
    }
  }

  useEffect(() => {
    console.log('Device Reader, page change, n: ', currentStoryPage)
    if (storyPaginated[currentStoryPage]) {
      playClickButton()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryPage, globalStory])

  const onDeviceReaderFinish = () => {
    if (currentStoryPage < storyPaginated.length) {
      setCurrentStoryPage(currentStoryPage + 1)
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
