import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => {
      if (type === 'error') {
        const existingError = prev.find((t) => t.type === 'error')
        if (existingError) {
          return prev.map((t) => (t.type === 'error' ? { ...t, message, id } : t))
        }
      }
      return [...prev, { id, message, type }]
    })

    // 🔔 Play notification sound
    const audio = new Audio('/notificationSound.mp3')
    audio.play().catch((err) => {
      console.warn('Notification sound blocked or failed:', err)
    })

    setTimeout(() => removeToast(id), 5000)
  }, [])

  const getLabel = (type) => {
    if (type === 'success') return 'Success'
    if (type === 'error') return 'Error'
    return 'Info'
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 320,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: '12px 16px',
              borderRadius: 6,
              backgroundColor: 'var(--buySellCardTabBg)',
              color: 'var(--text-color)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              minWidth: 300,
              fontWeight: 500,
              fontSize: 14,
              borderLeft:
                t.type === 'success'
                  ? '6px solid #5B9A5D'
                  : t.type === 'error'
                  ? '6px solid #E25F5B'
                  : '6px solid var(--text-color)',
              userSelect: 'none',
              cursor: 'default',
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            <strong
              style={{
                marginBottom: 4,
                color: `${t.type === 'success' ? '#5B9A5D' : '#E25F5B'}`,
              }}
            >
              {getLabel(t.type)}
            </strong>
            <span>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                fontWeight: 'bold',
                fontSize: 18,
                cursor: 'pointer',
                padding: 0,
                marginLeft: 12,
                lineHeight: 1,
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              aria-label="Close toast"
              title="Close"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
