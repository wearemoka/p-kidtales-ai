import React from 'react'
import { Button, Image } from '@chakra-ui/react'
import styles from './TopBar.module.scss'
import { useRouter } from 'next/navigation'

function BackButton () {
  const router = useRouter()

  return (
    <Button
      className={styles.backButton}
      variant='solid'
      aria-label='Go back'
      rightIcon={<Image src='/icons/ArrowLeft.svg' alt='Back arrow outline icon' />}
      onClick={() => {
        router.back()
      }}
    />
  )
}

export default BackButton
