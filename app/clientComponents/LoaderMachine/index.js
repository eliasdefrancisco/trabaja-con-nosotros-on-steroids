'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'

function TypedText () {
  const textToType = 'Este proceso puede tardar bastante, pocas veces mas de 1 minuto. Gracias por su paciencia.'
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (textToType.length > typedText.length) {
      setTimeout(() => {
        setTypedText(`${typedText}${textToType[typedText.length]}`)
      }, 250)
    }
  }, [typedText])

  return (
    <div className={styles.containerTypedText}>
      <p className={styles.typedText}>
        {typedText}
        <span className={styles.cursor}>|</span>
      </p>
    </div>
  )
}

export default function LoaderMachine () {
  return (
    <div>
      <div className={styles.typewriter}>
        <div className={styles.slide}><i /></div>
        <div className={styles.paper} />
        <div className={styles.keyboard} />
      </div>
      <TypedText />
    </div>
  )
}
