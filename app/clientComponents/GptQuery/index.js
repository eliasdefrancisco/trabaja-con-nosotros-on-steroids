'use client'

import { useGlobalContext } from '@/app/context/store'
import styles from './styles.module.css'
import { useState } from 'react'
import LoaderMachine from '@/app/components/LoaderMachine'

export default function GptQuery () {
  const { companyId, setGptData } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  async function handleClick () {
    try {
      setLoading(true)
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyId })
      })
      const data = await res.json()
      const json = JSON.parse(data)
      setGptData(json)
    } catch {
      console.log('!! GptQuery error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.gptQuery}>
      {
        loading &&
          <div className={styles.loading}>
            <LoaderMachine />
          </div>
      }
      {
        !loading &&
          <button className={styles.button} onClick={handleClick}>
            Generar formulario en una IA
          </button>
      }
    </div>
  )
}
