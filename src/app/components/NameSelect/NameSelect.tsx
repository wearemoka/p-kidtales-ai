import { useGlobalContext } from '@/app/context/store'
import { useEffect, useRef } from 'react'

interface Props {
    title: string,
    saveOn: string
}

function NameSelect ({ title, saveOn }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()
  const inputNameRef = useRef<HTMLInputElement>(null)

  const saveNameHandler = () => {
    const enteredName = inputNameRef.current!.value
    const newStep: any = { ...globalPrompt }
    const index = saveOn as keyof typeof globalPrompt
    newStep[index] = enteredName
    newStep.step = globalPrompt.step + 1
    setGlobalPrompt(newStep)
  }

  useEffect(() => {
    if (inputNameRef && inputNameRef.current && globalPrompt) {
      inputNameRef.current.value = globalPrompt.name
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>{title}</div>
      <input type='text' placeholder='name' ref={inputNameRef} />
      <button onClick={saveNameHandler}>GO!</button>
    </>
  )
}

export default NameSelect
