'use client'

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    modalTitle: string,
    content: any
    primaryActionLabel?: string,
    primaryAction?: () => void,
    secondaryActionLabel?: string,
    secondaryAction?: () => void
}

function ModalWrapper ({ isOpen, onClose, modalTitle, content, primaryActionLabel, primaryAction, secondaryActionLabel, secondaryAction }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {content}
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

        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalWrapper
