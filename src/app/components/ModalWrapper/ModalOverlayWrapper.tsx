'use client'

import { Modal, ModalOverlay, ModalContent, ModalFooter, Button, Box, VStack, ModalCloseButton, Container } from '@chakra-ui/react'

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
      {/* <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px)'
      /> */}
      <ModalContent>
        <ModalCloseButton />
        <Container>
          <ModalFooter>
            <VStack>
              <Box>

                {primaryActionLabel &&
                  <Button
                    className='small primary'
                    mr={3}
                    onClick={primaryAction}
                  >
                    {primaryActionLabel}
                  </Button>}
                {secondaryActionLabel &&
                  <Button
                    className='small secondary'
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
        </Container>

      </ModalContent>
    </Modal>
  )
}

export default ModalOverlayWrapper
