import { TOKENS } from '@/utils/tokenMap'
import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const PriceContext = createContext()

export function PriceProvider({ children }) {
  // Initialize data using TOKENS
  const [data, setData] = useState(
    Object.keys(TOKENS).map((key) => ({
      name: key,
      price: 'Loading...',
      change: '0.00',
      percent: '0.00',
    }))
  )
  const [loading, setLoading] = useState(true)

  // 🔹 Reset daily prices at start of a new day
  const checkAndResetDailyPrices = () => {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const lastReset = localStorage.getItem('lastPriceResetDate')

    if (lastReset !== today) {
      localStorage.setItem('lastPriceResetDate', today)
      localStorage.setItem('price24hData', JSON.stringify({})) // reset base prices
    }
  }

  useEffect(() => {
    const socket = io({ path: '/api/socket' })

    socket.on('connect', () => {
      // console.log('🟢 Connected to WebSocket')
    })

    socket.on('price-update', (priceFeed) => {
      // Find symbol by matching CODE in TOKENS
      const tokenEntry = Object.entries(TOKENS).find(([key, token]) => token.CODE === priceFeed.id)
      if (!tokenEntry || !priceFeed.price) return

      const [symbol] = tokenEntry

      checkAndResetDailyPrices()

      setData((prev) =>
        prev.map((item) => {
          if (item.name !== symbol) return item

          const newPrice = priceFeed.price * Math.pow(10, priceFeed.expo || 0)

          // 🔹 Load 24h base prices from localStorage
          const savedData = JSON.parse(localStorage.getItem('price24hData') || '{}')
          let basePrice = savedData[symbol]

          // 🔹 If no base price saved today, set it
          if (!basePrice) {
            savedData[symbol] = newPrice
            localStorage.setItem('price24hData', JSON.stringify(savedData))
            basePrice = newPrice
          }

          // 🔹 Calculate change and percent
          const change = newPrice - basePrice
          const percent = basePrice ? (change / basePrice) * 100 : 0

          return {
            name: symbol,
            price: newPrice.toFixed(2),
            change: change.toFixed(2),
            percent: percent.toFixed(2),
          }
        })
      )

      setLoading(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return <PriceContext.Provider value={{ data, loading }}>{children}</PriceContext.Provider>
}

export function usePrices() {
  return useContext(PriceContext)
}
