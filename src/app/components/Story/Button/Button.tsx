'use client'
import React from 'react'
import styles from './components.module.scss'

interface ButtonProps {
  onClick: () => void
  buttonText : string
  enabled: boolean
}

const Button:React.FC<ButtonProps> = ({
  onClick,
  buttonText,
  enabled
}) => {
  return (
    <div className={styles.row}>
      <button disabled={!enabled} onClick={() => onClick()} className={styles.button}>{
          buttonText
        }
      </button>
    </div>
  )
}

export default Button
