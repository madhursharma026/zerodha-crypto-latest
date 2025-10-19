import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrices } from '@/contexts/PriceContext'
import { usePrivacy } from '@/contexts/PrivacyContext'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import ProgressSection from '../Holdings/ProgressSection'
import styles from './Home.module.css'

export default function HoldingsSection() {
  const { holdings } = useHoldings()
  const { privacyMode } = usePrivacy()
  const { data: prices = [], loading } = usePrices()

  const priceMap = Object.fromEntries(prices.map((p) => [p.name, parseFloat(p.price)]))

  const totalInvested = holdings.reduce((sum, h) => sum + h.avgCost * h.qty, 0)
  const currentValue = holdings.reduce((sum, h) => sum + (priceMap[h.name] || h.avgCost) * h.qty, 0)
  const totalPnL = currentValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  // Shimmering skeleton placeholder
  const renderSkeleton = (width = '100px', height = '1.5rem') => (
    <span className={styles.skeleton} style={{ width, height, display: 'inline-block' }}></span>
  )

  function formateCurrency(value) {
    const sign = value < 0 ? '-' : ''
    const absValue = Math.abs(value)
    if (absValue >= 1_000_000) {
      return `${sign}${(absValue / 1_000_000).toFixed(2)}M`
    } else if (absValue >= 1_000) {
      return `${sign}${(absValue / 1_000).toFixed(2)}K`
    } else {
      return `${sign}${absValue.toFixed(2)}`
    }
  }

  return (
    <div className="row g-4 py-2">
      {/* Header */}
      <p className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}>
        <IoBagHandleOutline className="fs-4" /> Holdings ({holdings.length})
      </p>

      {/* PnL Summary */}
      <div className={`col-xl-4 col-md-5 col-sm-6 ${styles.borderEndOnlySm}`}>
        <span className={`fs-1 ${styles.textColor}`}>
          {privacyMode ? (
            <>
              <HiDotsHorizontal />
              <HiDotsHorizontal style={{ marginLeft: '-5px' }} />
            </>
          ) : loading ? (
            renderSkeleton('120px', '2.5rem')
          ) : (
            <div
              className={
                totalPnL > 0 ? styles.profitBg : totalPnL < 0 ? styles.lossBg : styles.textColor
              }
            >
              <span className={styles.decimal}>{formateCurrency(totalPnL)}</span>{' '}
              <span className="mediumFontSize">
                {totalPnLPercent >= 0 ? '+' : ''}
                {totalPnLPercent.toFixed(2)}%
              </span>
            </div>
          )}
        </span>
      </div>

      {/* Current Value & Investment */}
      <div className="col-xl-4 col-md-5 col-sm-6 px-4">
        <span className={styles.label}>Current value</span>
        {privacyMode ? (
          <>
            <HiDotsHorizontal />
            <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
          </>
        ) : loading ? (
          renderSkeleton('80px')
        ) : (
          <span className={styles.decimal}>{formateCurrency(currentValue)}</span>
        )}

        <br />

        <span className={styles.label}>Investment</span>
        {privacyMode ? (
          <>
            <HiDotsHorizontal />
            <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
          </>
        ) : loading ? (
          renderSkeleton('80px')
        ) : (
          <span className={styles.decimal}>{formateCurrency(totalInvested)}</span>
        )}
      </div>

      {holdings.length != 0 ? (
        <div className="col-md-9" style={{ marginTop: '-0px' }}>
          <ProgressSection height="50px" />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
