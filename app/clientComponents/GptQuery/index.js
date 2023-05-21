/* eslint-disable react/jsx-curly-newline */
'use client'

import { useGlobalContext } from '@/app/context/store'
import styles from './styles.module.css'
import { useState } from 'react'
import LoaderMachine from '@/app/components/LoaderMachine'

export default function GptQuery () {
  const { companyId, gptData, setGptData } = useGlobalContext()
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
      {loading &&
        <LoaderMachine />
      }
      {!loading &&
        <>
          <button className={styles.button} onClick={handleClick}>
            Obtener formulario
          </button>
          <div className={styles.gptData}>
            {gptData.map((item) => {
              return (
                <div key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              )
            })}
          </div>
        </>
      }
    </div>
  )
}
