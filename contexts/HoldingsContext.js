import { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from './ToastContext'

const HoldingsContext = createContext()

export function HoldingsProvider({ children }) {
  const [holdings, setHoldings] = useState([])
  const [orders, setOrders] = useState([])
  const { addToast } = useToast()

  // Load holdings and orders from localStorage
  useEffect(() => {
    const savedHoldings = JSON.parse(localStorage.getItem('holdings') || '[]')
    const savedOrders = JSON.parse(localStorage.getItem('todayOrdersHistory') || '[]')
    setHoldings(savedHoldings)
    setOrders(savedOrders)
  }, [])

  // Save holdings and orders to localStorage
  useEffect(() => localStorage.setItem('holdings', JSON.stringify(holdings)), [holdings])
  useEffect(() => localStorage.setItem('todayOrdersHistory', JSON.stringify(orders)), [orders])

  // Add a new order
  const addOrder = (type, token, qty, price) => {
    const newOrder = {
      id: `${token.name}-${Date.now()}`,
      Time: new Date().toLocaleTimeString(),
      Type: type,
      Instrument: token.name,
      Product: 'Equity',
      Qty: Number(qty),
      LTP: Number(price).toFixed(2),
      Price: Number(price).toFixed(2),
      Status: 'Complete',
    }

    setOrders((prev) => [...prev, newOrder])

    // Show toast notification
    addToast(`Your ${type} order for ${qty} ${token.name} at $${price} has been placed.`, 'success')
  }

  // Add or update holdings (Buy)
  const addHolding = (token, qty, price) => {
    setHoldings((prev) => {
      const existing = prev.find((h) => h.name === token.name)
      if (existing) {
        return prev.map((h) =>
          h.name === token.name
            ? {
                ...h,
                qty: h.qty + qty,
                avgCost: (h.avgCost * h.qty + price * qty) / (h.qty + qty) || 0,
              }
            : h
        )
      }
      return [...prev, { name: token.name, qty: Number(qty), avgCost: Number(price) || 0 }]
    })

    addOrder('BUY', token, qty, price)
  }

  // Sell holdings safely
  const sellHolding = (token, qty, price) => {
    let actualSellQty = 0

    setHoldings((prev) => {
      const existing = prev.find((h) => h.name === token.name)
      if (!existing) {
        addToast(`You do not own any ${token.name} to sell.`, 'error')
        return prev
      }

      actualSellQty = Math.min(qty, existing.qty)
      if (actualSellQty <= 0) return prev

      return prev
        .map((h) => {
          if (h.name === token.name) {
            const newQty = h.qty - actualSellQty
            if (newQty <= 0) return null
            return { ...h, qty: newQty, avgCost: Number(h.avgCost) || 0 }
          }
          return h
        })
        .filter(Boolean)
    })

    if (actualSellQty > 0) {
      addOrder('SELL', token, actualSellQty, price)
    }
  }

  return (
    <HoldingsContext.Provider value={{ holdings, orders, addHolding, sellHolding }}>
      {children}
    </HoldingsContext.Provider>
  )
}

export function useHoldings() {
  return useContext(HoldingsContext)
}
