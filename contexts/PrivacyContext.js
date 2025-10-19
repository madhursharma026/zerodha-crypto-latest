import { createContext, useContext, useEffect, useState } from 'react'

const PrivacyContext = createContext()

export function PrivacyProvider({ children }) {
  const [privacyMode, setPrivacyMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('privacyMode')
    if (stored === 'true') {
      setPrivacyMode(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('privacyMode', privacyMode.toString())
  }, [privacyMode])

  const togglePrivacy = () => setPrivacyMode((prev) => !prev)

  return (
    <PrivacyContext.Provider value={{ privacyMode, togglePrivacy }}>
      {children}
    </PrivacyContext.Provider>
  )
}

export function usePrivacy() {
  return useContext(PrivacyContext)
}
