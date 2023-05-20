import Image from 'next/image'
import styles from './page.module.css'
import infojobsLogo from '../../public/infojobs.svg'
import midudevLogo from '../../public/midudev.png'
import hackatonLogo from '../../public/hackathon.webp'

export default function Header() {
  return (
    <div className={styles.header}>
      <Image src={infojobsLogo} alt="Infojobs logo" width={200} height={100} />
      <Image src={midudevLogo} alt="Infojobs logo" width={250} height={75} />
      <Image src={hackatonLogo} alt="Infojobs logo" width={200} height={100} />
    </div>
  )
}
