'use client'
import { use, useCallback, useState } from 'react'

import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'reactfire'

interface StoryDataProps {
  title: string;
  description: string;
}

export const useCreateStory = () => {
  const firestore = useFirestore()
  const [state, setState] = useState<string>()

  const mutation = useCallback(async (StoryData: StoryDataProps) => {
    setState('loading')
    const organizationsPath = '/stories'
    const collectionReference =
      collection(firestore, organizationsPath)

    try {
      use(addDoc(
        collectionReference,
        StoryData
      ))
      setState('success')
    } catch (e) {
      setState('error')
    }
  }, [firestore])

  return [
    mutation,
    state
  ] as [
      typeof mutation,
      typeof state,
    ]
}
