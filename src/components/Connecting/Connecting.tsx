import React from 'react'
import styles from './Connecting.module.scss'

interface ConnectingProps {
  isVisible: boolean
}

export const Connecting = React.memo((props: ConnectingProps) => {
  return (
    <div className={props.isVisible ? styles.connecting : styles.hidden}>
      <div className={styles.loading} />
      <p className={styles.loadingText}>Connecting</p>
    </div>
  )
})
