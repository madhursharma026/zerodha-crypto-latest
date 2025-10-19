import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { CgArrowsExchange } from 'react-icons/cg'
import { MdKeyboardArrowDown } from 'react-icons/md'
import styles from './NewTradePage.module.css'

export default function Orderbook() {
  const [activeTab, setActiveTab] = useState(0)

  const orderbookData = {
    asks: [
      { price: 109054, size: 113000, total: 545000 },
      { price: 109052, size: 113000, total: 432000 },
      { price: 109051, size: 24700, total: 318000 },
      { price: 109050, size: 69900, total: 294000 },
      { price: 109049, size: 14900, total: 224000 },
      { price: 109043, size: 49900, total: 209000 },
      { price: 109040, size: 35000, total: 159000 },
      { price: 109037, size: 9990, total: 124000 },
      { price: 109034, size: 108000, total: 114000 },
      { price: 109026, size: 4990, total: 5480 },
      { price: 109017, size: 490, total: 491 },
      { price: 109054, size: 113000, total: 545000 },
      { price: 109052, size: 113000, total: 432000 },
      { price: 109051, size: 24700, total: 318000 },
      { price: 109050, size: 69900, total: 294000 },
    ],
    bids: [
      { price: 108957, size: 152000, total: 152000 },
      { price: 108952, size: 991, total: 153000 },
      { price: 108946, size: 337, total: 153000 },
      { price: 108938, size: 99900, total: 253000 },
      { price: 108935, size: 4980, total: 258000 },
      { price: 108915, size: 2250, total: 302000 },
      { price: 108900, size: 78800, total: 383000 },
      { price: 108887, size: 108000, total: 384000 },
      { price: 108880, size: 99800, total: 484000 },
      { price: 108872, size: 43500, total: 527000 },
      { price: 108957, size: 152000, total: 152000 },
      { price: 108952, size: 991, total: 153000 },
      { price: 108946, size: 337, total: 153000 },
      { price: 108938, size: 99900, total: 253000 },
    ],
    currentPrice: 108987,
    spread: 58, // USD
    spreadPercent: 0.054,
  }

  return (
    <div className="w-100">
      <div className={`${styles.chartTabWrapper} w-100`} style={{ '--active-index': activeTab }}>
        <ButtonGroup className={`${styles.chartTabGroup} w-100`}>
          {['Orderbook', 'Recent Trades'].map((label, index) => (
            <button
              key={label}
              className={`${styles.chartTabBtn} ${
                activeTab === index ? styles.chartActiveTab : ''
              }`}
              onClick={() => setActiveTab(index)}
            >
              {label}
            </button>
          ))}
        </ButtonGroup>
      </div>

      {/* Orderbook Content */}
      {activeTab === 0 && (
        <div className={styles.orderbookContent}>
          <div className={styles.orderbookSection}>
            <div className="row mb-3">
              <div className="col-6">
                <span>
                  $1 <MdKeyboardArrowDown />
                </span>
              </div>
              <div className="col-6 text-end">
                <span>
                  USD <CgArrowsExchange />
                </span>
              </div>
            </div>
            <div className={`${styles.orderbookHeader} ${styles.textColor}`}>
              <span>Price</span>
              <span>Size (USD)</span>
              <span>Total (USD)</span>
            </div>

            <div
              className="mt-3"
              style={{ overflowY: 'scroll', height: '600px', scrollbarWidth: 'none' }}
            >
              {/* ASKS */}
              {orderbookData.asks.map((ask, i) => (
                <div key={`ask-${i}`} className={styles.askRow}>
                  <span className={`${styles.askPrice} brandRedColor`}>
                    {ask.price.toLocaleString('en-US')}
                  </span>
                  <span className={styles.askSize}>{(ask.size / 1000).toFixed(1)}K</span>
                  <span className={styles.askTotal}>{(ask.total / 1000).toFixed(0)}K</span>
                </div>
              ))}

              {/* Current Price */}
              <div className={styles.currentPriceRow}>
                <span
                  className="brandGreenColor"
                  style={{ width: '33.3%', textAlign: 'left', fontSize: '16px' }}
                >
                  {orderbookData.currentPrice.toLocaleString('en-US')}
                </span>
                <span style={{ width: '33.3%' }}></span>
                <span className={styles.spread}>
                  Spread: ${orderbookData.spread} ({orderbookData.spreadPercent}%)
                </span>
              </div>

              {/* BIDS */}
              {orderbookData.bids.map((bid, i) => (
                <div key={`bid-${i}`} className={styles.bidRow}>
                  <span className={`${styles.bidPrice} brandGreenColor`}>
                    {bid.price.toLocaleString('en-US')}
                  </span>
                  <span className={styles.bidSize}>{(bid.size / 1000).toFixed(1)}K</span>
                  <span className={styles.bidTotal}>{(bid.total / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Trades Placeholder */}
      {activeTab === 1 && (
        <div className={`${styles.recentTradesContent} py-3 px-2 text-white`}>
          <div className={`${styles.orderbookHeader} ${styles.textColor}`}>
            <span>Price</span>
            <span>Size (USD)</span>
            <span>Total (USD)</span>
          </div>
          <div
            className="mt-3 mb-4"
            style={{ overflowY: 'scroll', height: '600px', scrollbarWidth: 'none' }}
          >
            {Array.from({ length: 5 })
              .flatMap(() => orderbookData.asks)
              .map((ask, i) => (
                <div key={`ask-${i}`} className={styles.askRow}>
                  <span className={`${styles.askPrice} brandRedColor`}>
                    {ask.price.toLocaleString('en-US')}
                  </span>
                  <span className={styles.askSize}>{(ask.size / 1000).toFixed(1)}K</span>
                  <span className={styles.askTotal}>{(ask.total / 1000).toFixed(0)}K</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
