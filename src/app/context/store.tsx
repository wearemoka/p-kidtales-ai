'use client'

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'
import { IStoryStore, IUserPromptSelection } from '@/app/utils/interfaces'

export const emptyPrompt: IUserPromptSelection = {
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
  story: {
    id: '',
    title: '',
    prompt: [],
    slug: '',
    story: ''
  },
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
  setGlobalPrompt: Dispatch<SetStateAction<IUserPromptSelection>>,
  // is any modal open?
  modalOpened: string,
  setModalOpened: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
  BGMusic: false,
  setBGMusic: (): boolean => false,
  globalStory: emptyStoryStore,
  setGlobalStory: IStoryStore => {},
  globalPrompt: emptyPrompt,
  setGlobalPrompt: IUserPromptSelection => {},
  modalOpened: '',
  setModalOpened: () : string => ''
})

export const GlobalContextProvider = ({ children }: Props) => {
  const [BGMusic, setBGMusic] = useState(false)
  const [globalStory, setGlobalStory] = useState<IStoryStore>(emptyStoryStore)
  const [globalPrompt, setGlobalPrompt] = useState(emptyPrompt)
  const [modalOpened, setModalOpened] = useState('')

  return (
    <GlobalContext.Provider value={{
      BGMusic,
      setBGMusic,
      globalStory,
      setGlobalStory,
      globalPrompt,
      setGlobalPrompt,
      modalOpened,
      setModalOpened
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
