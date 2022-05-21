import React from 'react'
import { SettingIcon } from '../../../libs/svg/SettingIcon'
import styles from './Header.module.scss'

export const Header = React.memo(() => {
  return (
    <header className={styles.header}>
      <p className={styles.logoIcon}>15</p>
      <p className={styles.logoText}>Puzzle Online</p>
      <SettingIcon />
    </header>
  )
})
