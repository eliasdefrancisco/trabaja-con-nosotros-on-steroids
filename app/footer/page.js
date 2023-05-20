import Image from 'next/image'
import styles from './page.module.css'
import miduLogo from '../../public/midudevLogo2.png'
import infojobsLogo from '../../public/infojobsLogo2.png'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logos}>
        <Image src={miduLogo} alt="Midudev logo" width={75} height={75} />
        <Image src={infojobsLogo} alt="Infojobs logo" width={50} height={50} />
      </div>
      <p className={styles.title}>
        PROYECTO PARA LA HACKATON DE INFOJOBS CON MIDUDEV 2023.
      </p>
      <p>
        Sientase libre de copiar cuanto quiera de este proyecto, pero recuerde que un gran poder conlleva una gran responsabilidad
      </p>
      <p className={styles.spider}>
        🕷
      </p>
    </div>
  )
}
