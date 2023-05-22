'use client'

import { useGlobalContext } from '@/app/context/store'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

export default function EditGptResponse () {
  const { gptData, setGptData } = useGlobalContext()
  const [newGptData, setNewGptData] = useState(gptData)
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    setNewGptData(gptData)
    console.log('gptData', gptData)
  }, [gptData])

  const handleInputChange = (index, field, value) => {
    setNewGptData(newGptData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value }
      }
      return item
    }))
    setHasChanged(true)
  }

  const handleSave = () => {
    setGptData(newGptData)
    setHasChanged(false)
  }

  if (!gptData.length) return null

  return (
    <div className={styles.content}>
      <h2>Puedes editar el formulario autogenerado</h2>
      {
        newGptData.map((item, index) => {
          return (
            <div key={item.id} className={styles.item}>
              <h3>Pregunta y posible respuesta número {index + 1}</h3>
              <textarea
                value={item.question}
                className={styles.question}
                onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              />
              <textarea
                value={item.answer}
                className={styles.answer}
                onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
              />
            </div>
          )
        })
      }
      {
        hasChanged &&
          <button className={styles.saveButtonActive} onClick={handleSave}>
            Aplicar cambios al formulario
          </button>
      }
      {
        !hasChanged &&
          <button className={styles.saveButtonInactive}>
            Sin cambio en el formulario
          </button>
      }
    </div>
  )
}
