'use client'
import React from 'react'
import styles from './components.module.css'

interface ButtonProps {
  onClick: () => void
  buttonText : string
  status: string
}

const Button:React.FC<ButtonProps> = ({
  onClick,
  buttonText,
  status
}) => {
  return (
    <div className={styles.row}>
      <button disabled={status === 'process'} onClick={() => onClick()} className={styles.button}>{
          buttonText
        }
      </button>
    </div>
  )
}

export default Button
