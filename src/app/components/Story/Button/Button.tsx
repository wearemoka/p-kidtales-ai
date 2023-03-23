'use client'
import React from 'react'
import styles from './components.module.css'

interface ButtonProps {
  onClick: () => void
  buttonText : string
  status?: string
  isDisabled?: boolean
}

const Button:React.FC<ButtonProps> = ({
  onClick,
  buttonText,
  isDisabled = false,
  status = 'pending'
}) => {
  return (
    <div className={styles.row}>
      <button disabled={!!(status === 'process' || isDisabled)} onClick={() => onClick()} className={styles.button}>{
          buttonText
        }
      </button>
    </div>
  )
}

export default Button
