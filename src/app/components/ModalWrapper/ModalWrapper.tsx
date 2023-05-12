'use client'

import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Container, Grid, GridItem } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    modalTitle: string,
    children?: ReactNode;
    primaryActionLabel?: string,
    primaryAction?: () => void,
    secondaryActionLabel?: string,
    secondaryAction?: () => void
}

function ModalWrapper ({ isOpen, onClose, modalTitle, children, primaryActionLabel, primaryAction, secondaryActionLabel, secondaryAction }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
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
                    colorScheme='blue'
                    mr={3}
                    onClick={primaryAction}
                  >
                    {primaryActionLabel}
                  </Button>}
                {secondaryActionLabel &&
                  <Button
                    colorScheme='cyan'
                    onClick={secondaryAction}
                  >
                    {secondaryActionLabel}
                  </Button>}
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
