import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrices } from '@/contexts/PriceContext'
import { usePrivacy } from '@/contexts/PrivacyContext'
import { Col, Row } from 'react-bootstrap'
import { HiDotsHorizontal } from 'react-icons/hi'
import styles from './Holdings.module.css'

export default function PortfolioMetrics() {
  const { holdings } = useHoldings()
  const { privacyMode } = usePrivacy()
  const { data: prices = [], loading } = usePrices()

  const priceMap = Object.fromEntries(prices.map((p) => [p.name, parseFloat(p.price)]))

  // Load yesterday’s base prices from localStorage
  const price24hData = JSON.parse(localStorage.getItem('price24hData') || '{}')

  // Total Investment
  const totalInvested = holdings.reduce((sum, h) => sum + h.avgCost * h.qty, 0)

  // Current Value
  const currentValue = holdings.reduce((sum, h) => sum + (priceMap[h.name] || h.avgCost) * h.qty, 0)

  // Total P&L
  const totalPnL = currentValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  // Day's P&L
  const prevDayValue = holdings.reduce(
    (sum, h) => sum + (price24hData[h.name] || h.avgCost) * h.qty,
    0
  )
  const dayPnL = holdings.reduce(
    (sum, h) =>
      sum + ((priceMap[h.name] || h.avgCost) - (price24hData[h.name] || h.avgCost)) * h.qty,
    0
  )
  const dayPnLPercent = prevDayValue > 0 ? (dayPnL / prevDayValue) * 100 : 0

  // Helper to split integer and decimals
  const formatNumber = (num) => {
    const [int, dec] = num.toFixed(2).split('.')
    return { int, dec }
  }

  // Shimmer placeholder
  const renderPlaceholder = () => <span className={styles.skeleton}></span>

  return (
    <Row className={`${styles.metricsRow} py-3`}>
      {/* Total Investment */}
      <Col md={3} xs={6}>
        <div className={styles.metricBox}>
          <span className={styles.label}>Total investment</span>
          <h5 className={styles.value}>
            {privacyMode ? (
              <>
                <HiDotsHorizontal />
                <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
              </>
            ) : loading ? (
              renderPlaceholder('60px')
            ) : (
              <>
                {formatNumber(totalInvested).int}
                <span className={styles.decimal}>.{formatNumber(totalInvested).dec}</span>
              </>
            )}
          </h5>
        </div>
      </Col>

      {/* Current Value */}
      <Col md={3} xs={6}>
        <div className={styles.metricBox}>
          <span className={styles.label}>Current value</span>
          <h5 className={styles.value}>
            {privacyMode ? (
              <>
                <HiDotsHorizontal />
                <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
              </>
            ) : loading ? (
              renderPlaceholder('70px')
            ) : (
              <>
                {formatNumber(currentValue).int}
                <span className={styles.decimal}>.{formatNumber(currentValue).dec}</span>
              </>
            )}
          </h5>
        </div>
      </Col>

      {/* Day's P&L */}
      <Col md={3} xs={6}>
        <div className={styles.metricBox}>
          <span className={styles.label}>Day&apos;s P&amp;L</span>
          <h5 className={`${styles.value} ${dayPnL >= 0 ? styles.profit : styles.loss}`}>
            {privacyMode ? (
              <>
                <HiDotsHorizontal />
                <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
              </>
            ) : loading ? (
              renderPlaceholder('50px')
            ) : (
              <>
                {formatNumber(dayPnL).int}
                <span className={styles.decimal}>.{formatNumber(dayPnL).dec}</span>
                <span
                  className={`${styles.percentBadge} ${
                    dayPnL >= 0 ? styles.profitBg : styles.lossBg
                  }`}
                >
                  {dayPnLPercent >= 0 ? '+' : ''}
                  {dayPnLPercent.toFixed(2)}%
                </span>
              </>
            )}
          </h5>
        </div>
      </Col>

      {/* Total P&L */}
      <Col md={3} xs={6}>
        <div className={styles.metricBox}>
          <span className={styles.label}>Total P&amp;L</span>
          <h5 className={`${styles.value} ${totalPnL >= 0 ? styles.profit : styles.loss}`}>
            {privacyMode ? (
              <>
                <HiDotsHorizontal />
                <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
              </>
            ) : loading ? (
              renderPlaceholder('65px')
            ) : (
              <>
                {formatNumber(totalPnL).int}
                <span className={styles.decimal}>.{formatNumber(totalPnL).dec}</span>
                <span
                  className={`${styles.percentBadge} ${
                    totalPnL >= 0 ? styles.profitBg : styles.lossBg
                  }`}
                >
                  {totalPnLPercent >= 0 ? '+' : ''}
                  {totalPnLPercent.toFixed(2)}%
                </span>
              </>
            )}
          </h5>
        </div>
      </Col>
    </Row>
  )
}
