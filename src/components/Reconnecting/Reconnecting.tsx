import React from 'react'
import styles from './Reconnecting.module.scss'

interface ReconnectingProps {
  isVisible: boolean
}

export const Reconnecting = React.memo((props: ReconnectingProps) => {
  return (
    <div className={props.isVisible ? styles.reconnecting : styles.hidden}>
      <div className={styles.loading} />
      <p className={styles.loadingText}>Reconnecting</p>
    </div>
  )
})
