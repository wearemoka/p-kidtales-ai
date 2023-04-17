'use client'

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    BGMusic: boolean,
    setBGMusic: Dispatch<SetStateAction<boolean>>,
    globalStory: string,
    setGlobalStory: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
  BGMusic: false,
  setBGMusic: (): boolean => false,
  globalStory: '',
  setGlobalStory: string => ''
})

interface Props {
  children: React.ReactNode
}

export const GlobalContextProvider = ({ children }: Props) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState('Your Story will be displayed here')

  return (
    <GlobalContext.Provider value={{ BGMusic, setBGMusic, globalStory, setGlobalStory }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
