import { Center, Stack } from '@chakra-ui/react'
import styles from './steps.module.scss'

interface Props {
    currentStep: number,
    size: number
}

function Steps ({ currentStep, size }: Props) {
  const steps = Array.from({ length: size }, (_, index) => ({ index, active: false }))

  if (currentStep >= 0 && currentStep < steps.length) {
    steps[currentStep].active = true
  }

  return (
    <Center>
      <Stack spacing={1} direction='row' className={styles.steps}>
        {steps.filter((e) => e.index > 0).map((e) => {
          return (
            <span
              key={e.index}
              className={`${e.active ? styles.active : ''} ${styles.dot}`}
            />
          )
        }
        )}
      </Stack>
    </Center>
  )
}

export default Steps
