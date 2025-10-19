import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrices } from '@/contexts/PriceContext'
import { usePrivacy } from '@/contexts/PrivacyContext'
import { useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import styles from './Holdings.module.css'

export default function ProgressSection({ height }) {
  const { holdings } = useHoldings()
  const { privacyMode } = usePrivacy()
  const { data: prices = [], loading } = usePrices()

  const [selected, setSelected] = useState('current')
  const [hoverInfo, setHoverInfo] = useState(null)

  const priceMap = Object.fromEntries(prices.map((p) => [p.name, parseFloat(p.price)]))
  const totalInvested = holdings.reduce((sum, h) => sum + h.avgCost * h.qty, 0)
  const currentValue = holdings.reduce((sum, h) => sum + (priceMap[h.name] || h.avgCost) * h.qty, 0)
  const pnl = currentValue - totalInvested
  const generateColors = (num) => {
    const colors = []
    for (let i = 0; i < num; i++) {
      const hue = 150 + (150 / num) * i // wider range
      const saturation = 60 + 20 * (i % 3) // vary slightly
      const lightness = 45 + 10 * ((i + 1) % 2) // alternate
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }
    return colors
  }

  const colors = generateColors(holdings.length)

  const getHoldingValue = (h) => {
    switch (selected) {
      case 'current':
        return ((priceMap[h.name] || h.avgCost) + 0.01) * h.qty
      case 'invested':
        return h.avgCost * h.qty
      case 'pnl':
        return ((priceMap[h.name] || h.avgCost) - h.avgCost) * h.qty
      default:
        return (priceMap[h.name] || h.avgCost) * h.qty
    }
  }

  const displayValue = () => {
    if (loading)
      return <div className={styles.skeleton} style={{ width: '100%', height: '24px' }} />
    if (privacyMode)
      return (
        <>
          <HiDotsHorizontal />
          <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
        </>
      )
    switch (selected) {
      case 'current':
        return <>${currentValue.toLocaleString()}</>
      case 'invested':
        return <>${totalInvested.toLocaleString()}</>
      case 'pnl':
        return <>${pnl.toLocaleString()}</>
      default:
        return <>${currentValue.toLocaleString()}</>
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div
        className="mt-4 position-relative rounded-0"
        style={{
          height: height ? height : '40px',
          display: 'flex',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        {loading
          ? [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className={styles.skeleton}
                style={{
                  width: `${25}%`,
                  height: '100%',
                  borderRadius: 0,
                }}
              />
            ))
          : holdings.map((h, idx) => {
              const value = getHoldingValue(h)
              const totalAbs = holdings.reduce((sum, h) => sum + Math.abs(getHoldingValue(h)), 0)
              const percent = totalAbs > 0 ? ((Math.abs(value) / totalAbs) * 100).toFixed(2) : 0

              let backgroundColor = colors[idx % colors.length]
              if (selected === 'pnl') backgroundColor = value >= 0 ? '#5B9A5D' : '#E25F5B'

              return (
                <div
                  key={idx}
                  style={{
                    width: `${percent}%`,
                    backgroundColor,
                    height: '100%',
                    transition: 'width 0.5s ease',
                    position: 'relative',
                  }}
                  onMouseMove={(e) =>
                    setHoverInfo({
                      x: e.clientX,
                      y: e.clientY,
                      name: h.name,
                      qty: h.qty,
                      avgCost: h.avgCost,
                      currentPrice: priceMap[h.name] || h.avgCost,
                      pnl: ((priceMap[h.name] || h.avgCost) - h.avgCost) * h.qty,
                    })
                  }
                  onMouseLeave={() => setHoverInfo(null)}
                />
              )
            })}

        {/* Zerodha-style Tooltip */}
        {hoverInfo && (
          <div
            style={{
              position: 'fixed',
              top: hoverInfo.y - 50,
              left: hoverInfo.x - 60,
              background: '#1b1b1b',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '6px',
              pointerEvents: 'none',
              zIndex: 1000,
              fontSize: '13px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
              minWidth: '120px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>{hoverInfo.name}</div>
            <div>Qty: {hoverInfo.qty}</div>
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #1b1b1b',
              }}
            />
          </div>
        )}
      </div>

      {/* Value Display & Radio Buttons */}
      <div className="row mt-3">
        <div className="col-md-4 mt-md-0 mt-3">
          <div className="fs-4 fw-normal">{displayValue()}</div>
        </div>
        <div className="col-md-8 text-md-end">
          {loading ? (
            <div className={styles.skeleton} style={{ width: '150px', height: '20px' }} />
          ) : (
            [
              { label: 'Current value', value: 'current' },
              { label: 'Investment value', value: 'invested' },
              { label: 'P&L', value: 'pnl' },
            ].map((item, i) => (
              <label key={i} className="mx-2" style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="valueOption"
                  className="mx-1"
                  checked={selected === item.value}
                  onChange={() => setSelected(item.value)}
                  disabled={loading}
                />
                {item.label}
              </label>
            ))
          )}
        </div>
      </div>
    </>
  )
}
