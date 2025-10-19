import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrices } from '@/contexts/PriceContext'
import { usePrivacy } from '@/contexts/PrivacyContext'
import { useMemo, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { BiDotsHorizontal } from 'react-icons/bi'
import { HiDotsHorizontal } from 'react-icons/hi'
import BuySellCard from '../BuySellCard/BuySellCard'
import styles from './Holdings.module.css'

export default function HoldingsTable({ data }) {
  const { privacyMode } = usePrivacy()
  const { holdings } = useHoldings()
  const { data: prices = [], loading } = usePrices()
  const { addHolding, sellHolding } = useHoldings()
  const [modalData, setModalData] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // ✅ Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.key] ?? 0
      const valB = b[sortConfig.key] ?? 0

      if (typeof valA === 'string') {
        return valA.localeCompare(valB)
      } else {
        // Ensure numeric comparison
        return Number(valA) - Number(valB)
      }
    })

    if (sortConfig.direction === 'desc') sorted.reverse()
    return sorted
  }, [data, sortConfig])

  if (!data || data.length === 0) return null

  const openBuySell = (type, item) => {
    const modalItem = {
      id: item.id,
      name: item.instrument,
      instrument: item.instrument,
      price: Number(item.ltp),
      qty: item.qty,
      avgCost: item.avgCost,
      invested: item.invested,
      currentVal: item.currentVal,
      pnl: item.pnl,
      pnlColor: item.pnlColor,
      netChg: item.netChg,
      netChgColor: item.netChgColor,
      dayChg: item.dayChg,
      dayChgColor: item.dayChgColor,
    }
    setModalData({ type, item: modalItem })
  }

  const closeBuySell = () => setModalData(null)

  const priceMap = Object.fromEntries(prices.map((p) => [p.name, parseFloat(p.price)]))

  const totalInvested = holdings.reduce((sum, h) => sum + h.avgCost * h.qty, 0)
  const currentValue = holdings.reduce((sum, h) => sum + (priceMap[h.name] || h.avgCost) * h.qty, 0)
  const totalPnL = currentValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  const prevDayValue = holdings.reduce((sum, h) => sum + (h.prevClose || h.avgCost) * h.qty, 0)
  const dayPnL = holdings.reduce(
    (sum, h) => sum + ((priceMap[h.name] || h.avgCost) - (h.prevClose || h.avgCost)) * h.qty,
    0
  )
  const dayPnLPercent = prevDayValue > 0 ? (dayPnL / prevDayValue) * 100 : 0

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      } else {
        return { key, direction: 'asc' }
      }
    })
  }

  return (
    <>
      <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
        <thead>
          <tr className="mediumFontSize">
            <th
              className={`${styles.textColor} fw-normal text-start ${styles.colInstrument} ${styles.borderRight}`}
              onClick={() => handleSort('instrument')}
              style={{ cursor: 'pointer' }}
            >
              Instrument
              <span
                className={`${styles.sortArrowInstrument} ${
                  sortConfig.key === 'instrument' ? 'active' : ''
                }`}
              >
                {sortConfig.key === 'instrument'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colQty}`}
              onClick={() => handleSort('qty')}
              style={{ cursor: 'pointer' }}
            >
              Qty.
              <span className={`${styles.sortArrow} ${sortConfig.key === 'qty' ? 'active' : ''}`}>
                {sortConfig.key === 'qty' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('avgCost')}
              style={{ cursor: 'pointer' }}
            >
              Avg. cost
              <span
                className={`${styles.sortArrow} ${sortConfig.key === 'avgCost' ? 'active' : ''}`}
              >
                {sortConfig.key === 'avgCost' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber} ${styles.borderRight}`}
              onClick={() => handleSort('ltp')}
              style={{ cursor: 'pointer' }}
            >
              LTP
              <span className={`${styles.sortArrow} ${sortConfig.key === 'ltp' ? 'active' : ''}`}>
                {sortConfig.key === 'ltp' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('invested')}
              style={{ cursor: 'pointer' }}
            >
              Invested
              <span
                className={`${styles.sortArrow} ${sortConfig.key === 'invested' ? 'active' : ''}`}
              >
                {sortConfig.key === 'invested' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('currentVal')}
              style={{ cursor: 'pointer' }}
            >
              Cur. val
              <span
                className={`${styles.sortArrow} ${sortConfig.key === 'currentVal' ? 'active' : ''}`}
              >
                {sortConfig.key === 'currentVal'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('pnl')}
              style={{ cursor: 'pointer' }}
            >
              P&L
              <span className={`${styles.sortArrow} ${sortConfig.key === 'pnl' ? 'active' : ''}`}>
                {sortConfig.key === 'pnl' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('netChg')}
              style={{ cursor: 'pointer' }}
            >
              Net chg.
              <span
                className={`${styles.sortArrow} ${sortConfig.key === 'netChg' ? 'active' : ''}`}
              >
                {sortConfig.key === 'netChg' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>

            <th
              className={`${styles.textColor} fw-normal ${styles.colNumber}`}
              onClick={() => handleSort('dayChg')}
              style={{ cursor: 'pointer' }}
            >
              Day chg.
              <span
                className={`${styles.sortArrow} ${sortConfig.key === 'dayChg' ? 'active' : ''}`}
              >
                {sortConfig.key === 'dayChg' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="mediumFontSize">
              <td className={`${styles.instrumentCell} ${styles.borderRight}`}>
                <span>{item.instrument}</span>
                <Dropdown>
                  <Dropdown.Toggle as="span" className={styles.dropdownToggle}>
                    <BiDotsHorizontal size={18} className={styles.textColor} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu}>
                    <Dropdown.Item
                      className={styles.dropdownText}
                      onClick={() => openBuySell('sell', item)}
                    >
                      Exit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={styles.dropdownText}
                      onClick={() => openBuySell('buy', item)}
                    >
                      Add
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.qty
                )}
              </td>
              <td className={styles.numberCell}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.avgCost
                )}
              </td>
              <td className={`${styles.numberCell} ${styles.borderRight}`}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.ltp
                )}
              </td>
              <td className={styles.numberCell}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.invested
                )}
              </td>
              <td className={styles.numberCell}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.currentVal
                )}
              </td>
              <td className={styles.numberCell} style={{ color: item.pnlColor }}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.pnl
                )}
              </td>
              <td className={styles.numberCell} style={{ color: item.netChgColor }}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.netChg
                )}
              </td>
              <td className={styles.numberCell} style={{ color: item.dayChgColor }}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                  </>
                ) : (
                  item.dayChg
                )}
              </td>
            </tr>
          ))}
          <tr className="mediumFontSize fw-bold">
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
            <td className={`fw-normal ${styles.numberCell}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                totalInvested.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              )}
            </td>
            <td className={`fw-normal ${styles.numberCell}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                currentValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              )}
            </td>
            <td className={`fw-normal ${styles.numberCell}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                totalPnL.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              )}
            </td>
            <td className={`fw-normal ${styles.numberCell}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                `${totalPnLPercent.toFixed(2)}%`
              )}
            </td>
            <td className={`fw-normal ${styles.numberCell}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                `${dayPnLPercent.toFixed(2)}%`
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {modalData && (
        <BuySellCard type={modalData.type} item={modalData.item} onClose={closeBuySell} />
      )}
    </>
  )
}
