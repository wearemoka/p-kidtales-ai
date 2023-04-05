import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className='header__link'>
        <ul>
          <li className={styles.navItem}>
            <Link href='/'>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/story/list'>
              List
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/story/generate'>
              Generate a Story
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/story/random'>
              Random Story
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/disclaimer'>
              Disclaimer
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
