import React, { useEffect, useState } from 'react'

import styles from './TopBar.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Stack, Image, Container, useDisclosure } from '@chakra-ui/react'
import BackButton from './BackButton'
import { useGlobalContext } from '@/app/context/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { updateDocumentInFireStore } from '@/app/services/FirebaseService'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

const TopBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showBackButton, setShowBackButton] = useState(false)
  const [showFlagButton, setShowFlagButton] = useState(false)
  const { BGMusic, setBGMusic } = useGlobalContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { globalStory } = useGlobalContext()

  const initialModalData = {
    title: '',
    children: <></>,
    primaryActionLabel: '',
    secondaryActionLabel: ''
  }

  const [modalData, setModalData] = useState(initialModalData)

  useEffect(() => {
    setShowBackButton(pathname !== '/')
    setShowFlagButton(pathname.startsWith('/story/view'))
  }, [pathname])

  /**
   * Changes the global status of background music
   */
  const musicOnOffButtonClick = () => {
    setBGMusic(!BGMusic)
  }

  const openModalAbout = () => {
    setModalData({
      title: 'About KidTales',
      children: (
        <>
          <div>
            KidTales is an innovative bedtime story generator that uses cutting-edge artificial intelligence to create unique and engaging stories for children. This user-friendly application is perfect for parents who want to spend quality time with their kids before bedtime, without the hassle of creating their own stories.
          </div>
          <br />
          <div>
            With KidTales, parents can choose from a variety of settings, characters, and themes to customize their child's bedtime story. The AI-powered generator then uses natural language processing to craft a unique and captivating tale that is tailored to the child's interests and reading level.
          </div>
        </>
      ),
      primaryActionLabel: '',
      secondaryActionLabel: ''
    })
    onOpen()
  }

  const flagTheStory = () => {
    console.log('flag', globalStory.story)
    const storyToFlag = { ...globalStory.story, appropriate: false }
    updateDocumentInFireStore(fireBaseStoryCollection, storyToFlag, storyToFlag.id).then((r) => { console.log(r) })
    onClose()
  }

  const openModalFlag = () => {
    setModalData({
      title: 'Flag this story',
      children: <div>Are you sure you want to flag this story as inappropriate?</div>,
      primaryActionLabel: 'Yes',
      secondaryActionLabel: 'No'
    })
    onOpen()
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
                router.push('/story/list')
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
              onClick={openModalAbout}
            />

            {showFlagButton &&
              <Button
                aria-label='Flag tale as inappropriate'
                rightIcon={<Image src='/icons/Flag.svg' alt='Books outline white icon' />}
                onClick={openModalFlag}
              >
                <label>Flag tale</label>
              </Button>}
          </Stack>
        </div>
      </Container>

      {/* Modal to display */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={modalData.title}
        // children={modalData.children}
        primaryActionLabel={modalData.primaryActionLabel}
        secondaryActionLabel={modalData.secondaryActionLabel}
        primaryAction={flagTheStory}
        secondaryAction={onClose}
      >{modalData.children}
      </ModalWrapper>

    </div>
  )
}

export default TopBar
