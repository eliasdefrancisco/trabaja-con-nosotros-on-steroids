'use client'

import { useGlobalContext } from '@/app/context/store'
import { useState } from 'react'
import styles from './styles.module.css'

export default function GenerateButton () {
  const { companyId, gptData, companyName, description } = useGlobalContext()
  const [htmlFromServer, setHtmlFromServer] = useState('')

  const copyHtmlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlFromServer)
      window.alert('¡El código del botón se ha copiado correctamente al portapapeles!')
    } catch (err) {
      console.error('Error al copiar el texto al portapapeles: ', err)
    }
  }

  async function downloadHtmlButton () {
    return await fetch(`/${companyId}-button.html`)
      .then(response => response.text())
      .then(data => {
        setHtmlFromServer(data)
        console.log('html del boton descargado correctamente')
      })
      .catch(error => {
        console.log('error al descargar el html del boton', error)
      })
  }

  async function handleGenerate () {
    const generationState = await fetch('/api/generate', {
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
    if (generationState.ok) {
      console.log('html generado correctamente')
      await downloadHtmlButton()
    } else {
      console.log('error al generar el html')
    }
  }

  if (!companyId || !gptData.length) return null

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleGenerate}>
        Generar botón !!
      </button>
      {htmlFromServer && <h2 className={styles.buttonDescription}>Haz clic en este botón autogenerado para experimentar su eficacia y luego copia el código de abajo en tu sitio web para incorporar su diseño y funcionalidad</h2>}
      {htmlFromServer && <div className={styles.generatedButton} dangerouslySetInnerHTML={{ __html: htmlFromServer }} />}
      {htmlFromServer && <textarea className={styles.htmlCode} value={htmlFromServer} readOnly />}
      {htmlFromServer && <button className={styles.button} onClick={copyHtmlToClipboard}>Copiar código al portapapeles</button>}
    </div>
  )
}
