'use client'
import { useCallback, useEffect, useState } from 'react'
import { getDocArrayDataType, getDocumentFromFireStore } from '../service/FirebaseService'

export function useFetchStory (storyPath: string) {
  const [data, setData] = useState<getDocArrayDataType[]>([])
  const [status, setStatus] = useState<string>('pending')
  const fetchStoriesList = useCallback(async () => {
    setStatus('process')
    const response = await getDocumentFromFireStore(storyPath)
    setStatus('success')
    setData(response)
  }, [storyPath])

  useEffect(() => {
    fetchStoriesList()
  }, [fetchStoriesList])

  return {
    data,
    setData,
    status
  }
}
