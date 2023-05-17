import React, { useEffect, useState } from 'react'

import styles from './TopBar.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Stack, Image, Container, useDisclosure } from '@chakra-ui/react'
import BackButton from './BackButton'
import { useGlobalContext } from '@/app/context/store'
import { ROUTES } from '@/app/utils/routes'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { updateDocumentInFireStore } from '@/app/services/FirebaseService'

const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string

const TopBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [showBackButton, setShowBackButton] = useState(false)
  const [areOnStoryView, setAreOnStoryView] = useState(false)
  const [areOnLibrary, setAreOnLibrary] = useState(false)
  const [areOnHome, setAreOnHome] = useState(false)
  const [areOnStoryGenerate, setAreOnStoryGenerate] = useState(false)

  const { BGMusic, setBGMusic } = useGlobalContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { globalStory } = useGlobalContext()

  // The history of navigation
  const [historyPath, setHistoryPath] = useState({ prevPage: '', currentPage: '' })

  const initialModalData = {
    title: '',
    children: <></>,
    primaryActionLabel: '',
    secondaryActionLabel: ''
  }

  const [modalData, setModalData] = useState(initialModalData)

  useEffect(() => {
    setHistoryPath({ prevPage: historyPath.currentPage, currentPage: pathname })

    setShowBackButton(pathname !== ROUTES.HOME)
    setAreOnStoryView(pathname.startsWith(ROUTES.STORY_VIEW))
    setAreOnLibrary(pathname.startsWith(ROUTES.LIBRARY))
    setAreOnHome(pathname === ROUTES.HOME)
    setAreOnStoryGenerate(pathname === ROUTES.STORY_GENERATE)
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

  const flagTheStory = async () => {
    const storyToFlag = { ...globalStory.story, appropriate: false }
    await updateDocumentInFireStore(fireBaseStoryCollection, storyToFlag, globalStory.story.id)
    onClose()
    router.push('/')
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
          {showBackButton &&
            <BackButton historyPath={historyPath} />}
          <div className={`${styles.brand} ${areOnHome || areOnStoryGenerate ? styles.home : ''}`}>
            <Image src='/images/KidTalesLogo.svg' alt='KidTales logo in white color' />
          </div>

          <Stack direction='row' spacing={{ base: 1, md: 4 }} className={styles.actions}>
            {!areOnStoryView && !areOnLibrary &&
              <Button
                aria-label='Go to Library'
                rightIcon={<Image src='/icons/Library.svg' alt='Books outline white icon' />}
                className='md_secondary'
                onClick={() => {
                  router.push(ROUTES.LIBRARY)
                }}
              >
                <label>Library</label>
              </Button>}

            {/* <Button
              aria-label='Music on/off'
              rightIcon={<Image src='/icons/Music.svg' alt='Books outline white icon' />}
              display={{ base: 'block', md: 'none' }}
              onClick={musicOnOffButtonClick}
            /> */}

            {!areOnStoryView &&
              <Button
                aria-label='About us'
                rightIcon={<Image src='/icons/Info.svg' alt='Books outline white icon' />}
                onClick={openModalAbout}
              />}

            {areOnStoryView && !areOnLibrary &&
              <Button
                className='big secondary only-icon'
                aria-label='Flag tale as inappropriate'
                rightIcon={<Image src='/icons/Flag.svg' alt='Books outline white icon' />}
                onClick={openModalFlag}
              />}
          </Stack>
        </div>
      </Container>

      {/* Modal to display */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={modalData.title}
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
