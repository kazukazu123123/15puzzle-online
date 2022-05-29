import React from 'react'
import { globalState } from '../../../libs/global-state'
import { SettingIcon } from '../../../libs/svg/SettingIcon'
import styles from './Header.module.scss'
const { useGlobalState } = globalState

export const Header = React.memo(() => {
  const [gameStatus] = useGlobalState('gameStatus')

  const leaveRoom = () => {}

  return (
    <header className={styles.header}>
      <p className={styles.logoIcon}>15</p>
      <p className={styles.logoText}>Puzzle Online</p>
      {gameStatus === 'game' && (
        <div className={styles.leaveRoom} onClick={leaveRoom} />
      )}
      <SettingIcon />
    </header>
  )
})
