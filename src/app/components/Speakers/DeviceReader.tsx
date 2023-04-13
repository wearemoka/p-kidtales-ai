'use client'
import React, { useRef } from 'react'

const DeviceReader = ({ text }: { text: string }) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = async () => {
    console.log('s')
    try {
      utteranceRef.current = new SpeechSynthesisUtterance()
      utteranceRef.current.text = text
      utteranceRef.current.rate = 0.8

      speechSynthesis.speak(utteranceRef.current)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <button onClick={speak}> Device Reader </button>
  )
}

export default DeviceReader
