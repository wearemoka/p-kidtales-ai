import { useEffect, useState } from 'react'
import { LoadingMessages } from '@/app/utils/constants'

/**
 * This Custom Hook update the text every 5 seconds and returns it
 * useful to change the loading message.
 * @param loading boolean reset the function
 */
export function useMessageTime (loading:boolean):string | null {
  const [messageIndex, setMessageIndex] = useState<number>(0)

  useEffect(() => {
    let timer

    if (loading) {
      timer = setTimeout(() => {
        if (messageIndex < LoadingMessages.length - 1) {
          setMessageIndex(messageIndex + 1)
        }
      }, 5000)
    } else {
      setMessageIndex(0)
      clearTimeout(timer)
    }
  }, [loading, messageIndex])

  return (messageIndex !== -1) ? LoadingMessages[messageIndex] : null
}
