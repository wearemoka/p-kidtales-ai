import { useGlobalContext } from '@/app/context/store'
import { moderateStringWithAI } from '@/app/services/ChatGPTService'
import { Button, Heading, Input, VStack, Image, Box } from '@chakra-ui/react'
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
  const [flaggedName, setFlaggedName] = useState<boolean>(false)

  const saveNameHandler = async () => {
    setFlaggedName(false)
    if (validName) {
      const enteredName = inputNameRef.current!.value

      const resp = await moderateStringWithAI(enteredName)
      if (resp.results[0].flagged) {
        setFlaggedName(true)
      } else {
        setFlaggedName(false)
        const newStep: any = { ...globalPrompt }
        const index = saveOn as keyof typeof globalPrompt
        newStep[index] = enteredName
        newStep.step = globalPrompt.step + 1
        setGlobalPrompt(newStep)
      }
    }
  }

  useEffect(() => {
    setFlaggedName(false)
    if (inputNameRef && inputNameRef.current && globalPrompt) {
      inputNameRef.current.value = globalPrompt.name
      nameChangeHandle()
    }
    inputNameRef.current?.focus()
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
        isInvalid={flaggedName}
      />

      {flaggedName &&
        <Box>
          This name can be considered insulting; please try a different one.
        </Box>}
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
