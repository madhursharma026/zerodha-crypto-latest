import { useEffect, useState } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState('light')

  // Load theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('zerodhaKiteCloneTheme') || 'light'
    setTheme(stored)
    document.body.classList.add(`${stored}-mode`)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    document.body.classList.remove(`${theme}-mode`)
    document.body.classList.add(`${newTheme}-mode`)

    localStorage.setItem('zerodhaKiteCloneTheme', newTheme)
    setTheme(newTheme)
  }

  return { theme, toggleTheme }
}
