'use client'

import { useGlobalContext } from '@/app/context/store'
import styles from './styles.module.css'

export default function GenerateButton () {
  const { companyId, gptData, companyName, description } = useGlobalContext()

  async function handleGenerate () {
    const generatedFileName = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companyId,
        questionsAndAnswers: gptData,
        companyName,
        description
      })
    })
    console.log('!! GenerateButton generatedFileName', generatedFileName)
  }

  if (!companyId || !gptData.length) return null

  return (
    <button className={styles.button} onClick={handleGenerate}>
      Generar botón !!
    </button>
  )
}
