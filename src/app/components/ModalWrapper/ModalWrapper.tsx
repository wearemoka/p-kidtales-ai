'use client'

import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Container, Image, Grid, Text, GridItem, Slide, Box, useMediaQuery } from '@chakra-ui/react'
import React, { ReactElement, ReactNode } from 'react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    modalTitle: string,
    children?: ReactNode;
    primaryActionLabel?: string,
    primaryAction?: () => void,
    secondaryActionLabel?: string,
    secondaryAction?: () => void,
    rightIconPrimaryAction?: ReactElement;
    alignmentBottom?: boolean;
    rightIconSecondaryAction?: ReactElement;
}

function ModalWrapper ({ isOpen, onClose, modalTitle, children, primaryActionLabel, primaryAction, secondaryActionLabel, secondaryAction, rightIconPrimaryAction, alignmentBottom, rightIconSecondaryAction }: Props) {
  const [isMobile] = useMediaQuery('(max-width: 600px)')
  const modalContent = (
    <Container>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
        <GridItem colSpan={{ lg: 8, md: 12, base: 12 }}>
          <div className='heading-small'>{modalTitle}</div>
          <div className='body'>
            {children}
          </div>
          <div>
            {primaryActionLabel &&
              <Button
                mr={3}
                onClick={primaryAction}
                className='small primary'
                rightIcon={rightIconPrimaryAction}
              >
                {primaryActionLabel}
              </Button>}
            {secondaryActionLabel &&
              <Button
                className={`${alignmentBottom ? 'md_secondary_border' : 'small secondary'}`}
                onClick={secondaryAction}
                rightIcon={rightIconSecondaryAction}
              >
                <label>{secondaryActionLabel}</label>
              </Button>}
            {alignmentBottom &&
              <div className='back-bottom-button'>
                <Button
                  variant='ghost'
                  className='small'
                  onClick={onClose}
                  leftIcon={<Image src='/icons/Arrow-Left.svg' alt='Back arrow outline icon' />}
                >
                  <label>Back to Story</label>
                </Button>
              </div>}
          </div>
        </GridItem>
        <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
      </Grid>
    </Container>
  )

  return (
    <>
      {(isMobile && !alignmentBottom)
        ? <>
          <Slide
            direction='bottom' in={isOpen} style={{ zIndex: 10 }}
          >
            {/* <div className='backdrop' onClick={onClose} /> */}
            <Box
              p='40px'
              color='white'
              mt='4'
              bg='teal.500'
              rounded='md'
              shadow='md'
            >
              <Text onClick={onClose}>close</Text>
              {modalContent}
            </Box>
          </Slide>
        </>
        : <Modal
            isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size='full'
          >
          <ModalContent className={alignmentBottom ? 'modal-bottom' : ''}>
            <ModalCloseButton />
            {modalContent}
          </ModalContent>
          </Modal>}
    </>
  )
}

export default ModalWrapper
