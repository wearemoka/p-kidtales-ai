'use client'

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'
import { IUserPromptSelection } from '@/app/utils/interfaces'

const emptyPrompt: IUserPromptSelection = {
  step: 1,
  age: '',
  character: '',
  name: '',
  scenario: '',
  lesson: ''
}
interface Props {
  children: React.ReactNode
}
interface ContextProps {
    BGMusic: boolean,
    setBGMusic: Dispatch<SetStateAction<boolean>>,
    globalStory: string,
    setGlobalStory: Dispatch<SetStateAction<string>>,
    currentStoryPage: number,
    setCurrentStoryPage: Dispatch<SetStateAction<number>>,
    globalPrompt: IUserPromptSelection,
    setGlobalPrompt: Dispatch<SetStateAction<IUserPromptSelection>>
}

const GlobalContext = createContext<ContextProps>({
  BGMusic: false,
  setBGMusic: (): boolean => false,
  globalStory: '',
  setGlobalStory: string => '',
  currentStoryPage: 0,
  setCurrentStoryPage: number => 0,
  globalPrompt: emptyPrompt,
  setGlobalPrompt: IUserPromptSelection => {}
})

export const GlobalContextProvider = ({ children }: Props) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState('Your Story will be displayed here')
  const [currentStoryPage, setCurrentStoryPage] = useState(0)
  const [globalPrompt, setGlobalPrompt] = useState(emptyPrompt)

  return (
    <GlobalContext.Provider value={{
      BGMusic,
      setBGMusic,
      globalStory,
      setGlobalStory,
      currentStoryPage,
      setCurrentStoryPage,
      globalPrompt,
      setGlobalPrompt
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
