'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useGlobalContext } from './context/store'

export default function Home () {
  const { companyName, imageName, description } = useGlobalContext()

  return (
    <main className={styles.main}>
      <h1>
        Trabaja con nosotros - On steroids
      </h1>
      <h2>
        Genera el botón de `Trabaja con nosotros` para tu web en un par de clicks y sin necesidad de redactar nada
      </h2>
      <h3>En unos cuantos pasos</h3>
      <p>
        Permite a las empresas que buscan trabajadores en Infojobs, generar el código HTML necesario para incrustar un enlace en sus webs corporativas, el cual llevará a los usuarios a un formulario con preguntas autogeneradas con una IA tipo ChatGPT
      </p>

      <div style={{ marginTop: '1rem' }}>
        <Image src={`/${imageName}`} alt={`${imageName} logo`} width={50} height={50} />
        <h2>{companyName}</h2>
        <h3>Descripción de la empresa</h3>
        <p>{description}</p>
      </div>

    </main>
  )
}
