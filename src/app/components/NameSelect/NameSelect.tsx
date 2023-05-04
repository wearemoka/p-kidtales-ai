import { useGlobalContext } from '@/app/context/store'
import { Button, Heading, Input, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import styles from './nameselect.module.scss'

interface Props {
    title: string,
    saveOn: string
}

function NameSelect ({ title, saveOn }: Props) {
  const { globalPrompt, setGlobalPrompt } = useGlobalContext()
  const inputNameRef = useRef<HTMLInputElement>(null)
  const [validName, setValidName] = useState<boolean>(false)

  const saveNameHandler = () => {
    if (validName) {
      const enteredName = inputNameRef.current!.value
      const newStep: any = { ...globalPrompt }
      const index = saveOn as keyof typeof globalPrompt
      newStep[index] = enteredName
      newStep.step = globalPrompt.step + 1
      setGlobalPrompt(newStep)
    }
  }

  useEffect(() => {
    if (inputNameRef && inputNameRef.current && globalPrompt) {
      inputNameRef.current.value = globalPrompt.name
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nameChangeHandle = () => {
    if (inputNameRef.current && inputNameRef.current.value.length >= 3) {
      setValidName(true)
    } else {
      setValidName(false)
    }
  }

  return (
    <VStack>
      <Heading>{title}</Heading>

      <Input type='text' placeholder='name' ref={inputNameRef} onChange={nameChangeHandle} />
      <Button className={validName ? styles.enabled : styles.disabled} onClick={saveNameHandler}>GO!</Button>
    </VStack>
  )
}

export default NameSelect
