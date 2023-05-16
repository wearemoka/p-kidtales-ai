'use client'

import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Container, Image, Grid, GridItem } from '@chakra-ui/react'
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className={alignmentBottom ? 'modal-bottom' : ''}>
        <ModalCloseButton />
        <Container>
          <Grid templateColumns='repeat(12, 1fr)' gap={4}>
            <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
            <GridItem colSpan={{ lg: 8, md: 12, base: 12 }}>
              <ModalHeader className='heading-small'>{modalTitle}</ModalHeader>
              <ModalBody className='body'>
                {children}
              </ModalBody>
              <ModalFooter>
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
                      onClick={onClose}
                      leftIcon={<Image src='icons/Arrow-Left.svg' alt='Arrow left outline white icon' />}
                    >
                      <label>Back to Story</label>
                    </Button>
                  </div>}
              </ModalFooter>
            </GridItem>
            <GridItem colSpan={{ lg: 2, md: 0, base: 0 }} />
          </Grid>
        </Container>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
