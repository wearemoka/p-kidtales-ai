import React, { useEffect, useState } from 'react'

import styles from './TopBar.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Stack, Image, Container } from '@chakra-ui/react'
import BackButton from './BackButton'
import { useGlobalContext } from '@/app/context/store'
import { ROUTES } from '@/app/utils/routes'

const TopBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showBackButton, setShowBackButton] = useState(false)
  const [showFlagButton, setShowFlagButton] = useState(false)
  const { BGMusic, setBGMusic } = useGlobalContext()

  useEffect(() => {
    setShowBackButton(pathname !== ROUTES.HOME)
    setShowFlagButton(pathname.startsWith(ROUTES.STORY_VIEW))
  }, [pathname])

  /**
   * Changes the global status of background music
   */
  const musicOnOffButtonClick = () => {
    setBGMusic(!BGMusic)
  }

  return (
    <div className={styles.topbar}>
      <Container>
        <div className={styles.topbarWrapper}>
          <div className={styles.brand}>
            {showBackButton
              ? <BackButton />
              : <Image src='/images/KidTalesLogo.svg' alt='KidTales logo in white color' />}
          </div>

          <Stack direction='row' spacing={{ base: 1, md: 4 }} className={styles.actions}>
            <Button
              aria-label='Go to Library'
              rightIcon={<Image src='/icons/Library.svg' alt='Books outline white icon' />}
              className='md_secondary'
              onClick={() => {
                router.push(ROUTES.LIBRARY)
              }}
            >
              <label>Library</label>
            </Button>

            <Button
              aria-label='Music on/off'
              rightIcon={<Image src='/icons/Music.svg' alt='Books outline white icon' />}
              display={{ base: 'block', md: 'none' }}
              onClick={musicOnOffButtonClick}
            />

            <Button
              aria-label='About us'
              rightIcon={<Image src='/icons/Info.svg' alt='Books outline white icon' />}
              onClick={() => {
                console.log('open modal')
              }}
            />

            {showFlagButton &&
              <Button
                aria-label='Flag tale as inappropriate'
                rightIcon={<Image src='/icons/Flag.svg' alt='Books outline white icon' />}
                onClick={() => {
                  console.log('Flag this story.')
                }}
              >
                <label>Flag tale</label>
              </Button>}
          </Stack>
        </div>
      </Container>
    </div>
  )
}

export default TopBar
