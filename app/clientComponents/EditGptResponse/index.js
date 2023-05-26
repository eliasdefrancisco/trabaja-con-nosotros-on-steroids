'use client'

import { useGlobalContext } from '@/app/context/store'
import styles from './styles.module.css'

export default function EditGptResponse () {
  const { gptData, setGptData } = useGlobalContext()

  const handleInputChange = (index, field, value) => {
    setGptData(gptData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  if (!gptData.length) return null

  return (
    <div className={styles.content}>
      <h2>Puedes editar el formulario autogenerado</h2>
      {
        gptData.map((item, index) => {
          return (
            <div key={item.id} className={styles.item}>
              <h3>Pregunta y respuesta de ejemplo número {index + 1}</h3>
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
    </div>
  )
}
