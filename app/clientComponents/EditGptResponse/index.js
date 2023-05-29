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
      <h2>Personaliza a tu gusto</h2>
      <p className={styles.description}>Este es el formulario autogenerado el cual tendrán que rellenar tus usuarios al pulsar el botón de 'Trabaja con nosotros' en tu web.Consta de preguntas y ejemplos de respuestas autogeneradas por chatGPT</p>
      {
        gptData.map((item, index) => {
          return (
            <div key={item.id} className={styles.item}>
              <h3 className={styles.title}>Pregunta y respuesta de ejemplo número {index + 1}</h3>
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
