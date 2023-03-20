import React from 'react'
import Link from "next/link";
import styles from './Header.module.css';
const Header = () => {

    return (
        <div className={styles.header} >
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
                </ul>
            </div>
        </div>
    )
}

export default Header