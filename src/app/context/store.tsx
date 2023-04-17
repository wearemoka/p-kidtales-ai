'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

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

export const GlobalContextProvider = ({ children }) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState('Your Story will be displayed here')

  return (
    <GlobalContext.Provider value={{ BGMusic, setBGMusic, globalStory, setGlobalStory }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
