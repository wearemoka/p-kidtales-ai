'use client'

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface Props {
  children: React.ReactNode
}
interface ContextProps {
    BGMusic: boolean,
    setBGMusic: Dispatch<SetStateAction<boolean>>,
    globalStory: string,
    setGlobalStory: Dispatch<SetStateAction<string>>,
    currentStoryPage: number,
    setCurrentStoryPage: Dispatch<SetStateAction<number>>
}

const GlobalContext = createContext<ContextProps>({
  BGMusic: false,
  setBGMusic: (): boolean => false,
  globalStory: '',
  setGlobalStory: string => '',
  currentStoryPage: 0,
  setCurrentStoryPage: number => 0
})

export const GlobalContextProvider = ({ children }: Props) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState('Your Story will be displayed here')
  const [currentStoryPage, setCurrentStoryPage] = useState(0)

  return (
    <GlobalContext.Provider value={{ BGMusic, setBGMusic, globalStory, setGlobalStory, currentStoryPage, setCurrentStoryPage }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
