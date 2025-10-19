// zerodha-crypto/pages/trade/[symbol].js

import ChartHeader from '@/components/GraphArea/ChartHeader'
import styles from '@/components/GraphArea/GraphArea.module.css'
import OrdersPanel from '@/components/GraphArea/OrderPanel'
import PriceChart from '@/components/GraphArea/PriceChart'
import ScrollspyContent from '@/components/GraphArea/ScrollspyContent'
import TokenInfo from '@/components/GraphArea/TokenInfo'
import { TOKENS } from '@/utils/tokenMap'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Element, scroller } from 'react-scroll'

const intervalMap = {
  '1D': { interval: '15m', limit: 288 },
  '7D': { interval: '1h', limit: 168 },
  '1M': { interval: '4h', limit: 180 },
  '1Y': { interval: '1d', limit: 365 },
  All: { interval: '1w', limit: 1000 },
}

export default function TradePage() {
  const router = useRouter()
  const { symbol } = router.query
  const [data, setData] = useState([])
  const [latestPrice, setLatestPrice] = useState(null)
  const [activeTime, setActiveTime] = useState('7D')
  const [tokenInfo, setTokenInfo] = useState(null)

  const fetchData = async (mappedSymbol, interval, limit) => {
    if (!mappedSymbol) return
    try {
      const res = await fetch(`/api/binance/${mappedSymbol}?interval=${interval}&limit=${limit}`)
      const raw = await res.json()

      if (!Array.isArray(raw) || raw.length === 0) {
        setData([])
        setLatestPrice(null)
        return
      }

      setData(raw)
      setLatestPrice(raw[raw.length - 1]?.close || null)
    } catch (err) {
      console.error('Error fetching Binance data:', err)
      setData([])
      setLatestPrice(null)
    }
  }

  const fetchTokenInfo = async (tokenName) => {
    if (!tokenName) return setTokenInfo({})
    try {
      const res = await fetch(`/api/coingecko/${tokenName}`)
      const json = await res.json()
      setTokenInfo(json || {})
    } catch {
      setTokenInfo({})
    }
  }

  useEffect(() => {
    if (!symbol) return
    const token = TOKENS[symbol.toUpperCase()]
    if (!token) return

    const { interval, limit } = intervalMap[activeTime] || intervalMap['7D']
    fetchData(token.SYMBOL, interval, limit)
    fetchTokenInfo(token.NAME)

    const intervalId = setInterval(() => fetchData(token.SYMBOL, interval, limit), 5000)
    return () => clearInterval(intervalId)
  }, [symbol, activeTime])

  const [activeTab, setActiveTab] = useState('Charts')
  const tabs = [
    { name: 'Charts', label: 'Charts' },
    { name: 'Market', label: 'Market' },
    { name: 'News', label: 'News' },
    { name: 'Token', label: 'Token' },
    { name: 'Yield', label: 'Yield' },
    { name: 'TokenUnlocked', label: 'Token Unlocked' },
    { name: 'About', label: 'About' },
  ]
  const scrollTo = (name) => {
    setActiveTab(name)
    scroller.scrollTo(name, {
      duration: 500,
      smooth: true,
      offset: -45,
      containerId: 'chartScrollContainer',
    })
  }

  return (
    <>
      <Head>
        <title>
          {latestPrice
            ? `$${latestPrice.toLocaleString()} | ${symbol?.toUpperCase()} | Exolane`
            : `${symbol?.toUpperCase()} | Exolane`}
        </title>
      </Head>
      <div className={styles.rightSidebarContainer}>
        <div className="row px-3 h-100">
          <div className={styles.chartArea} id="tradeLeftColumn">
            <div id="chartScrollContainer" className={styles.chartAreaScroll}>
              <nav
                className={styles.tabs2}
                style={{ position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 999 }}
              >
                {tabs.map((tab) => (
                  <span
                    key={tab.name}
                    className={`${activeTab === tab.name ? styles.active : ''}`}
                    onClick={() => scrollTo(tab.name)}
                  >
                    {tab.label}
                  </span>
                ))}
              </nav>

              <Element name="Charts" className="pt-2">
                <ChartHeader activeTime={activeTime} setActiveTime={setActiveTime} />
                <PriceChart data={data} />
              </Element>

              <div className="mt-5">
                <hr />
              </div>
              <Element name="Market">
                <ScrollspyContent contentHeader="Market" />
              </Element>
              <Element name="News">
                <ScrollspyContent contentHeader="News" />
              </Element>
              <Element name="Token">
                <ScrollspyContent contentHeader="Token" />
              </Element>
              <Element name="Yield">
                <ScrollspyContent contentHeader="Yield" />
              </Element>
              <Element name="TokenUnlocked">
                <ScrollspyContent contentHeader="Token Unlocked" />
              </Element>
              <Element name="About">
                <ScrollspyContent contentHeader="About" />
              </Element>

              <div id="ordersSection">
                <OrdersPanel />
              </div>
              <footer
                style={{
                  textAlign: 'center',
                  padding: '10px 0',
                  fontSize: '14px',
                  backgroundColor: 'var(--background-color)',
                  color: 'var(--text-color)',
                }}
                className="mt-5"
              >
                Charts are powered by{' '}
                <Link
                  href="https://tradingview.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2962FF', textDecoration: 'none' }}
                >
                  TradingView
                </Link>
              </footer>
            </div>
          </div>

          <div className={`${styles.rightSidebar} p-0`}>
            <TokenInfo symbol={symbol} latestPrice={latestPrice} tokenInfo={tokenInfo} />
          </div>
        </div>
      </div>
    </>
  )
}
