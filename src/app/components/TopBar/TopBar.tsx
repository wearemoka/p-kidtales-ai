'use client'
import React, { useEffect, useState } from 'react'

import styles from './TopBar.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Button, Stack, Image, Container, useDisclosure, useToast, Box, SimpleGrid } from '@chakra-ui/react'
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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { globalStory, setModalOpened } = useGlobalContext()

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const closeModal = () => {
    setModalOpened('')
    onClose()
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
    if (isOpen) {
      closeModal()
    } else {
      setModalOpened('about-kidtales')
      onOpen()
    }
  }

  const flagTheStory = async () => {
    const storyToFlag = { ...globalStory.story, appropriate: false }
    await updateDocumentInFireStore(fireBaseStoryCollection, storyToFlag, globalStory.story.id)
    closeModal()
    toast({
      position: 'top-right',
      title: 'You successfully flagged the tale as inappropriate',
      description: 'Thanks for become Kidtales a safest place, feel free to create a new tale.',
      status: 'info',
      duration: 90000,
      isClosable: true
    })
    router.push('/')
  }

  const openModalFlag = () => {
    setModalData({
      title: 'Do you want to flag this tale as inappropriate?',
      children: <p>We want to ensure a safe and positive experience for all our readers. If you see any inappropriate content or language in this story, please flag it so we can review it.</p>,
      primaryActionLabel: 'Flag Story',
      secondaryActionLabel: 'Cancel'
    })
    setModalOpened('flag-story')
    onOpen()
  }

  const toast = useToast()

  return (
    <div className={styles.topbar}>
      <Container>
        <SimpleGrid columns={[3]} spacing='20px' className={styles.topbarWrapper}>
          <Box className={styles.gridStart}>
            {showBackButton &&
              <BackButton historyPath={historyPath} />}
            <div className={styles.brand}>
              <Image src='/images/KidTalesLogo.svg' alt='KidTales logo in white color' />
            </div>
          </Box>
          <Box className={styles.gridCenter}>
            <div className={styles.brand}>
              <Image src='/images/KidTalesLogo.svg' alt='KidTales logo in white color' />
            </div>
          </Box>
          <Box className={styles.gridEnd}>
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
                  rightIcon={<Image src='/icons/Flag.svg' alt='Flag outline white icon' />}
                  onClick={openModalFlag}
                />}
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Modal to display */}
      <ModalWrapper
        isOpen={isOpen}
        onClose={closeModal}
        modalTitle={modalData.title}
        primaryActionLabel={modalData.primaryActionLabel}
        secondaryActionLabel={modalData.secondaryActionLabel}
        primaryAction={flagTheStory}
        secondaryAction={closeModal}
        rightIconPrimaryAction={<Image src='/icons/Flag.svg' alt='Flag outline white icon' />}
      >{modalData.children}
      </ModalWrapper>

    </div>
  )
}

export default TopBar
