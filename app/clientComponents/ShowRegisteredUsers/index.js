'use client'

import { useGlobalContext } from '@/app/context/store'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function ShowRegisteredUsers () {
  const { companyId } = useGlobalContext()
  const [jsonData, setJsonData] = useState(undefined)

  function showItem (key, value) {
    return (
      value &&
      value.trim() !== '' &&
      key !== 'email' &&
      key !== 'companyId'
    )
  }

  useEffect(() => {
    if (companyId) {
      fetch('/api/register?companyId=' + companyId)
        .then((response) => response.json())
        .then((data) => {
          setJsonData(data)
        })
    }
  }, [companyId])

  return (
    <div>
      {
        jsonData && jsonData.length > 0 && (
          jsonData.map((userForm) => (
            <div key={userForm.email} className={styles.userForm}>
              <h2 className={styles.email}>{userForm.email}</h2>
              {
                Object.entries(userForm).map(([key, value]) => (
                  showItem(key, value) &&
                    <div key={`${userForm.email}-${key}`}>
                      <h3>{`${key}`}</h3>
                      <p>{`${value}`}</p>
                    </div>
                ))
              }
            </div>
          ))
        )
      }
    </div>
  )
}
