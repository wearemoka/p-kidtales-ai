import { useGlobalContext } from '@/app/context/store'
import { useRef } from 'react'

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
    setGlobalPrompt(newStep)
  }

  return (
    <>
      <div>{title}</div>
      <input type='text' placeholder='name' ref={inputNameRef} />
      <button onClick={saveNameHandler}>GO!</button>
    </>
  )
}

export default NameSelect
