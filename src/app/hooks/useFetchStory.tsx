'use client'
import { useCallback, useEffect, useState } from 'react'
import { getDocArrayDataType, getDocumentFromFireStore } from '@/app/services/FirebaseService'

export function useFetchStory (storyPath: string) {
  const [data, setData] = useState<getDocArrayDataType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchStoriesList = useCallback(async () => {
    setLoading(true)
    const response = await getDocumentFromFireStore(storyPath)
    setLoading(false)
    setData(response)
  }, [storyPath])

  useEffect(() => {
    fetchStoriesList()
  }, [fetchStoriesList])

  return {
    data,
    setData,
    loading
  }
}
