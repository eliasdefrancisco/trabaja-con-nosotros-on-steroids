'use client';

import { createContext, useContext, useState } from "react";
import { companiesMock } from './companiesMock';

const GlobalContext = createContext({
  companyName: companiesMock[0].companyName,
  imageName: companiesMock[0].imageName,
  description: companiesMock[0].description,
  setCompanyName: () => {},
  setImageName: () => {},
  setDescription: () => {},
})

export const GlobalContextProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState(companiesMock[0].companyName)
  const [imageName, setImageName] = useState(companiesMock[0].imageName)
  const [description, setDescription] = useState(companiesMock[0].description)
  
  return (
      <GlobalContext.Provider value={{ 
        companyName,
        setCompanyName,
        imageName,
        setImageName,
        description,
        setDescription,
      }}>
        {children}
      </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext)