'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { companiesMock } from './companiesMock'

const GlobalContext = createContext({
  companyId: companiesMock[0].companyId,
  companyName: companiesMock[0].companyName,
  imageName: companiesMock[0].imageName,
  description: companiesMock[0].description,
  gptData: [],
  lastServerUpdate: null,
  setCompanyName: () => null,
  setImageName: () => null,
  setDescription: () => null,
  setGptData: () => null
})

export const GlobalContextProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(companiesMock[0].companyId)
  const [companyName, setCompanyName] = useState(companiesMock[0].companyName)
  const [imageName, setImageName] = useState(companiesMock[0].imageName)
  const [description, setDescription] = useState(companiesMock[0].description)
  const [gptData, setGptData] = useState([])
  const [lastServerUpdate, setLastServerUpdate] = useState([])

  useEffect(() => {
    // Escucha cuando ha habido un cambio en el servidor y actualiza el estado en el cliente
    const eventSource = new window.EventSource('/api/events')
    eventSource.onmessage = (event) => {
      setLastServerUpdate(event.data)
    }
    // Limpiar el EventSource cuando el componente se desmonte
    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <GlobalContext.Provider value={{
      gptData,
      setGptData,
      companyId,
      setCompanyId,
      companyName,
      setCompanyName,
      imageName,
      setImageName,
      description,
      setDescription,
      lastServerUpdate
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
