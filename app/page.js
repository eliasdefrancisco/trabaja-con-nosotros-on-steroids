import CompanyMockSelector from './clientComponents/CompanyMockSelector'
import EditGptResponse from './clientComponents/EditGptResponse'
import GenerateButton from './clientComponents/GenerateButton'
import GptQuery from './clientComponents/GptQuery'
import styles from './page.module.css'

export default function Home () {
  return (
    <main className={styles.main}>
      <h2>
        Genera el botón de `Trabaja con nosotros` para tu web en un par de clicks y sin necesidad de redactar
      </h2>
      <h1>
        Trabaja con nosotros - On steroids
      </h1>
      <p>
        Permite crear a las empresas el boton de 'Trabaja con nosotros' personalizado para poner en su web corporativa. El botón llevará a los usuarios interesados a un formulario con preguntas autogeneradas con una IA tipo ChatGPT
      </p>
      <p>
        Recluta tu talento de forma más eficiente y sin esfuerzo, usando el trafico de tu web
      </p>
      <CompanyMockSelector />
      <GptQuery />
      <EditGptResponse />
      <GenerateButton />
    </main>
  )
}
