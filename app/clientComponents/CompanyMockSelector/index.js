'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import { useGlobalContext } from '@/app/context/store'
import { companiesMock } from '@/app/context/companiesMock'

export default function CompanyMockSelector () {
  const {
    companyId,
    setCompanyId,
    companyName,
    setCompanyName,
    imageName,
    setImageName,
    description,
    setDescription
  } = useGlobalContext()
  const companyNames = companiesMock.map((company) => company.companyName)

  function handleSelect (e) {
    const selectedCompany = companiesMock.find(
      (company) => company.companyName === e.target.value
    )
    setCompanyId(selectedCompany.companyId)
    setCompanyName(selectedCompany.companyName)
    setImageName(selectedCompany.imageName)
    setDescription(selectedCompany.description)
  }

  return (
    <div className={styles.container}>
      <h3>Selecciona una empresa</h3>
      <div className={styles.selector}>
        <div>
          <Image src={`/${imageName}`} alt={`${imageName} logo`} width={50} height={50} />
        </div>
        <select className={styles.select} onChange={handleSelect}>
          {companyNames.map((name) => {
            return (
              <option key={name} value={name}>{name}</option>
            )
          })}
        </select>
      </div>
      <h2>{companyName} - ID: {companyId}</h2>
      <h3>Descripción de la empresa</h3>
      <p>{description}</p>
    </div>
  )
}
