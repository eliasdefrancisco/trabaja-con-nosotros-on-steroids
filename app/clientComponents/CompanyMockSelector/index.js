'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import { useGlobalContext } from '@/app/context/store'
import { companiesMock } from '@/app/context/companiesMock'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CompanyMockSelector ({ domainUrl }) {
  const {
    companyId,
    setCompanyId,
    setCompanyName,
    imageName,
    setImageName,
    setDescription,
    lastServerUpdate
  } = useGlobalContext()
  const [registerDataExists, setRegisterDataExists] = useState(false)

  function handleSelect (e) {
    const selectedCompany = companiesMock.find(
      (company) => company.companyId === e.target.value
    )
    setCompanyId(selectedCompany.companyId)
    setCompanyName(selectedCompany.companyName)
    setImageName(selectedCompany.imageName)
    setDescription(selectedCompany.description)
  }

  async function checkRegiterJsonExists (companyId) {
    const registerUrl = domainUrl + companyId + '-register.json'
    try {
      const response = await fetch(registerUrl, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (companyId) {
      checkRegiterJsonExists(companyId).then((data) => {
        setRegisterDataExists(data)
      })
    }
  }, [companyId, domainUrl, lastServerUpdate])

  return (
    <div className={styles.container}>
      <h2>Selecciona un usuario tipo empresa para probar</h2>
      <p className={styles.little}>
        * Este paso es necesario solo porque NO se dispone de un usuario real de empresa
      </p>
      <div className={styles.selector}>
        <div>
          <Image src={`/${imageName}`} alt={`${imageName} logo`} width={50} height={50} />
        </div>
        <select
          className={styles.select}
          onChange={handleSelect}
          value={companyId}
        >
          {companiesMock.map(company => {
            const { companyName: name, companyId: id } = company
            return (
              <option key={id} value={id}>{name}</option>
            )
          })}
        </select>
        {
          registerDataExists &&
            <Link
              href={`/showRegisters/${companyId}`}
              className={styles.registerUsersText}
            >
              Ver usuarios registrados →
            </Link>
        }
        {
          !registerDataExists &&
            <p className={styles.registerUsersText}>
              No hay usuarios registrados
            </p>
        }
      </div>
    </div>
  )
}
