import { companiesMock } from '@/app/context/companiesMock'
import ShowRegisteredUsers from '@/app/clientComponents/ShowRegisteredUsers'
import Link from 'next/link'
import styles from './page.module.css'

export default async function ShowRegisters ({ params }) {
  const { companyId } = params
  const { companyName } = companiesMock.find((company) => company.companyId === companyId)

  return (
    <div>
      <Link href='/'> ← Volver al inicio </Link>
      <h2>Usuarios interesados en <span className={styles.companyName}>{companyName}</span></h2>
      <ShowRegisteredUsers />
    </div>
  )
}
