import React from 'react'
import styles from './TopBar.module.scss'
import { Button, Stack, Image, Container } from '@chakra-ui/react'

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <Container>
        <div className={styles.topbarWrapper}>
          <div className={styles.brand}>
            <Image src='images/KidTalesLogo.svg' alt='KidTales logo in white color' />
            {/* Add a condition to show back button instead of logo */}
            <Button className={styles.backButton} variant='solid' aria-label='Go back' rightIcon={<Image src='icons/ArrowLeft.svg' alt='Back arrow outline icon' />} />
          </div>
          <Stack direction='row' spacing={{ base: 1, md: 4 }} className={styles.actions}>
            <Button aria-label='Go to Library' rightIcon={<Image src='icons/Library.svg' alt='Books outline white icon' />}>
              <label>Library</label>
            </Button>
            <Button aria-label='Music on/off' rightIcon={<Image src='icons/Music.svg' alt='Books outline white icon' />}>
              <label>Music On</label>
            </Button>
            <Button aria-label='About us' rightIcon={<Image src='icons/Info.svg' alt='Books outline white icon' />}>
              <label>Info</label>
            </Button>
            <Button aria-label='Flag tale as inappropriate' rightIcon={<Image src='icons/Flag.svg' alt='Books outline white icon' />}>
              <label>Flag tale</label>
            </Button>
          </Stack>
        </div>
      </Container>
    </div>
  )
}

export default TopBar
