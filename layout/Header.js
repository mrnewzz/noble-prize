import React from 'react'
import styles from '../styles/Header.module.css'

function Header({ year }) {
  return (
    <div className={ styles.content }>
        <label className={styles.title}>Noble Prize</label>
         <h2 className={ styles.subtitle }> { year === '' ? "" : `ประจำปี ค.ศ. ${ year }` } </h2>
    </div>
  )
}

export default Header