import CompanyMockSelector from './clientComponents/CompanyMockSelector'
import GptQuery from './clientComponents/GptQuery'
import styles from './page.module.css'

export default function Home () {
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
      <CompanyMockSelector />
      <GptQuery />
    </main>
  )
}
