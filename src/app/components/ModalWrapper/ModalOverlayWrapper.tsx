'use client'

import { Modal, ModalOverlay, ModalContent, ModalFooter, Button, Box, VStack } from '@chakra-ui/react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    primaryActionLabel?: string,
    primaryAction?: () => void,
    secondaryActionLabel?: string,
    secondaryAction?: () => void,
    closeLabelButton: string
}

function ModalOverlayWrapper ({ isOpen, onClose, primaryActionLabel, primaryAction, secondaryActionLabel, secondaryAction, closeLabelButton }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px)'
      />
      <ModalContent>

        <ModalFooter>
          <VStack>
            <Box>

              {primaryActionLabel &&
                <Button
                  colorScheme='purple'
                  mr={3}
                  onClick={primaryAction}
                >
                  {primaryActionLabel}
                </Button>}
              {secondaryActionLabel &&
                <Button
                // colorScheme='cyan'
                  onClick={secondaryAction}
                >
                  {secondaryActionLabel}
                </Button>}
            </Box>
            <Button
              variant='ghost'
              onClick={onClose}
            >
              <label>{closeLabelButton}</label>
            </Button>
          </VStack>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

export default ModalOverlayWrapper
