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
    <div>
      {steps.map((e) => {
        return (
          <small
            key={e.index}
            className={`${e.active ? styles.active : ''}`}
          >
            {e.index}
          </small>
        )
      }
      )}
    </div>
  )
}

export default Steps
