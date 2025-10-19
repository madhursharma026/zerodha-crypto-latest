import HeaderActions from '@/components/Holdings/HeaderActions'
import styles from '@/components/Holdings/Holdings.module.css'
import HoldingsCard from '@/components/Holdings/HoldingsCard'
import HoldingsTable from '@/components/Holdings/HoldingsTable'
import PortfolioMetrics from '@/components/Holdings/PortfolioMetrics'
import ProgressSection from '@/components/Holdings/ProgressSection'
import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrices } from '@/contexts/PriceContext'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Col } from 'react-bootstrap'

export default function Holdings() {
  const { holdings } = useHoldings()
  const { data: prices } = usePrices()
  const [searchTerm, setSearchTerm] = useState('')

  // Map for quick price lookup
  const priceMap = Object.fromEntries((prices || []).map((p) => [p.name, parseFloat(p.price)]))

  // Transform holdings for table/cards
  const holdingData = holdings.map((h, i) => {
    const ltp = priceMap[h.name] || h.avgCost
    const invested = h.avgCost * h.qty
    const currentVal = ltp * h.qty
    const pnl = currentVal - invested
    const prevDayVal = (h.prevClose || h.avgCost) * h.qty
    const dayChg = currentVal - prevDayVal
    const netChgPercent = invested > 0 ? (pnl / invested) * 100 : 0
    const dayChgPercent = prevDayVal > 0 ? (dayChg / prevDayVal) * 100 : 0

    return {
      id: i,
      instrument: h.name,
      qty: h.qty,
      avgCost: h.avgCost.toFixed(2),
      ltp: ltp.toFixed(2),
      invested: invested.toFixed(2),
      currentVal: currentVal.toFixed(2),
      pnl: pnl.toFixed(2),
      netChg: netChgPercent.toFixed(2) + '%',
      dayChg: dayChgPercent.toFixed(2) + '%',
      pnlColor: pnl >= 0 ? '#00b894' : '#d63031',
      netChgColor: pnl >= 0 ? '#00b894' : '#d63031',
      dayChgColor: dayChg >= 0 ? '#00b894' : '#d63031',
    }
  })

  // ✅ Filter holdings based on search term
  const filteredData = holdingData.filter((h) =>
    h.instrument.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ✅ Download CSV
  const handleDownloadCSV = () => {
    if (filteredData.length === 0) return

    const headers = [
      'Instrument',
      'Qty',
      'Avg Cost',
      'LTP',
      'Invested',
      'Current Value',
      'P&L',
      'Net Chg',
      'Day Chg',
    ]

    const rows = filteredData.map((item) => [
      item.instrument,
      item.qty,
      item.avgCost,
      item.ltp,
      item.invested,
      item.currentVal,
      item.pnl,
      item.netChg,
      item.dayChg,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const link = document.createElement('a')
    link.href = encodeURI(csvContent)
    link.download = 'holdings.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Head>
        <title>Holdings | Exolane</title>
      </Head>
      <Col className={`px-4 py-3 ${styles.rightSidebarContainer} h-100`}>
        <div className={styles.rightColumn}>
          {holdingData.length === 0 ? (
            <div className="text-center mt-5">
              <Image src="/placeholderIcon.png" alt="#ImgNotFound" width={100} height={100} />
              <p className={styles.textColor}>You haven’t any holdings</p>
              <Link className="btn btn-primary" href="/" role="button">
                Get Started
              </Link>
            </div>
          ) : (
            <>
              <HeaderActions
                count={holdingData.length}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onDownload={handleDownloadCSV} // ✅ Pass download handler
              />
              <hr className={styles.divider} />

              <PortfolioMetrics />
              <hr className={styles.divider} />

              {filteredData.length === 0 ? (
                <div className="text-center my-5">
                  <Image
                    src="https://kite.zerodha.com/static/images/illustrations/orderbook.svg"
                    alt="#ImgNotFound"
                    width={100}
                    height={100}
                  />
                  <p className={styles.textColor}>No Holdings Found With {`"${searchTerm}"`}</p>
                </div>
              ) : (
                <>
                  <HoldingsTable data={filteredData} />
                  {filteredData.map((item) => (
                    <HoldingsCard key={item.id} item={item} />
                  ))}
                </>
              )}

              <ProgressSection />
            </>
          )}
        </div>
      </Col>
    </>
  )
}
