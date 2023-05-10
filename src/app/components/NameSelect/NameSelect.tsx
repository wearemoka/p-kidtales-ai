import { useGlobalContext } from '@/app/context/store'
import { Button, Heading, Input, VStack, Image } from '@chakra-ui/react'
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

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      saveNameHandler()
    }
  }

  return (
    <VStack>
      <Heading as='h3' className='caption bold' mb={3}>{title}</Heading>

      <Input
        type='text'
        placeholder='e.g. Ziggy'
        ref={inputNameRef}
        onChange={nameChangeHandle}
        onKeyDown={handleKeyPress}
      />

      {validName &&
        <Button
          rightIcon={<Image src='/icons/Arrow-Right.svg' alt='Arrow right outline white icon' />}
          className={`big primary only-icon ${validName ? styles.enabled : styles.disabled}`}
          onClick={saveNameHandler}
        />}
    </VStack>
  )
}

export default NameSelect
