'use client'
import { useCallback, useEffect, useState } from 'react'
import { getDocArrayDataType, getDocumentFromFireStore } from '../service/FirebaseService'

export function useFetchStory (storyPath: string) {
  const [data, setData] = useState<getDocArrayDataType[]>([])

  const fetchStoriesList = useCallback(async () => {
    const response = await getDocumentFromFireStore(storyPath)
    setData(response)
  }, [storyPath])

  useEffect(() => {
    fetchStoriesList()
  }, [fetchStoriesList])

  return {
    data,
    setData
  }
}
