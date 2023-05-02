'use client'

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'
import { IStoryStore, IUserPromptSelection } from '@/app/utils/interfaces'

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

const emptyStoryStore: IStoryStore = {
  story: '',
  storyPaged: [],
  currentPage: 0
}

interface ContextProps {
  // BG Music on/off
  BGMusic: boolean,
  setBGMusic: Dispatch<SetStateAction<boolean>>,
  // story object
  globalStory: IStoryStore,
  setGlobalStory: Dispatch<SetStateAction<IStoryStore>>,
  // object with prompt values
  globalPrompt: IUserPromptSelection,
  setGlobalPrompt: Dispatch<SetStateAction<IUserPromptSelection>>
}

const GlobalContext = createContext<ContextProps>({
  BGMusic: false,
  setBGMusic: (): boolean => false,
  globalStory: emptyStoryStore,
  setGlobalStory: IStoryStore => {},
  globalPrompt: emptyPrompt,
  setGlobalPrompt: IUserPromptSelection => {}
})

export const GlobalContextProvider = ({ children }: Props) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState(emptyStoryStore)
  const [globalPrompt, setGlobalPrompt] = useState(emptyPrompt)

  return (
    <GlobalContext.Provider value={{
      BGMusic,
      setBGMusic,
      globalStory,
      setGlobalStory,
      globalPrompt,
      setGlobalPrompt
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
