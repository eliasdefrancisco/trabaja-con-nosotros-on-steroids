import CompanyMockSelector from './clientComponents/CompanyMockSelector'
import EditGptResponse from './clientComponents/EditGptResponse'
import GenerateButton from './clientComponents/GenerateButton'
import GptQuery from './clientComponents/GptQuery'
import styles from './page.module.css'

export default function Home () {
  return (
    <main>
      <h2>
        Genera el botón de `Trabaja con nosotros` para tu web en un par de clicks y sin necesidad de redactar
      </h2>
      <h1>
        Trabaja con nosotros ¡On steroids!
      </h1>
      <p className={styles.description}>
        Impulsa tu negocio al próximo nivel con el innovador botón 'Trabaja con nosotros'. Esta brillante adición a tu sitio web corporativo te permite transformar cada visita en una posible incorporación de talento
      </p>
      <p className={styles.description}>
        Al hacer clic en el botón, tus visitantes son dirigidos a un formulario inteligente, alimentado por la sofisticada inteligencia artificial de ChatGPT. Aquí, se encontrarán con preguntas personalizadas autogeneradas que capturan su potencial y se adaptan a las necesidades únicas de tu empresa
      </p>
      <p className={styles.description}>
        Revoluciona tu proceso de reclutamiento con este sistema eficiente y sin esfuerzo. Descubre, atrae y adquiere talento de una manera que nunca antes habías imaginado. Haz que tu sitio web trabaje para ti - ¡conviértelo en tu mejor aliado de reclutamiento con nuestro botón 'Trabaja con nosotros' hoy mismo y sin esfuerzo!
      </p>
      <hr className={styles.barra} />
      <CompanyMockSelector domainUrl={process.env.DOMAIN_URL} />
      <GptQuery />
      <EditGptResponse />
      <GenerateButton />
    </main>
  )
}
