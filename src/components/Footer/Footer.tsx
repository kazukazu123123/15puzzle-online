import React from 'react'
import styles from './Footer.module.scss'

export const Footer = React.memo(() => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Original: </p>
      <a
        className={styles.linkText}
        href="https://github.com/hiraginoyuki/webpack.15-puzzle.app/"
        target="_blank"
        draggable="false"
      >
        hiraginoyuki/webpack.15-puzzle.app
      </a>
    </footer>
  )
})
