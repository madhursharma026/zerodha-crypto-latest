import styles from '@/components/NewTradePage/NewTradePage.module.css'
import Orderbook from '@/components/NewTradePage/Orderbook'
import OrdersPanel from '@/components/NewTradePage/OrderPanel'
import TradePanel from '@/components/NewTradePage/TradePanel'
import TokenDetails from '@/components/NewTradePage/TradeTokenDetail'
import { Card } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'

export default function NewTradePage() {
  return (
    <div className={styles.NewTradePageBG} style={{ overflowX: 'hidden' }}>
      <div
        className={`p-3 d-xl-flex d-none`}
        style={{ gap: '1rem', alignItems: 'stretch', height: '100%' }}
      >
        {/* Left Section */}
        <div className={`flex-grow-1 d-flex flex-column`} style={{ minHeight: 0 }}>
          <Card className={`${styles.NewTradePageCardBG} ${styles.textColor} mb-2`}>
            <Card.Body className="px-3 pt-2 pb-2 d-flex align-items-center">
              <FaStar className="mediumFontSize me-2" />
              <span className="mediumFontSize me-3">BTC</span>
              <span className="mediumFontSize text-danger me-4">-2.45%</span>
              <span className="mediumFontSize me-3">SOL</span>
              <span className="mediumFontSize text-danger">-4.69%</span>
            </Card.Body>
          </Card>

          <TokenDetails />

          <img
            src="/newTradePageGraphImage.png"
            alt="Trading Graph"
            style={{ flexGrow: 1, objectFit: 'cover', width: '100%', minHeight: 0 }}
          />
        </div>

        {/* Right Fixed Columns */}
        <div
          style={{
            width: '300px',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Orderbook style={{ flex: 1, minHeight: 0 }} />
        </div>

        <div
          style={{
            width: '300px',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <TradePanel style={{ flex: 1, minHeight: 0 }} />
        </div>
      </div>

      <div className="d-xl-none d-block p-3">
        <Card className={`${styles.NewTradePageCardBG} ${styles.textColor} mb-2`}>
          <Card.Body className="px-3 pt-2 pb-2 d-flex align-items-center">
            <FaStar className="mediumFontSize me-2" />
            <span className="mediumFontSize me-3">BTC</span>
            <span className="mediumFontSize text-danger me-4">-2.45%</span>
            <span className="mediumFontSize me-3">SOL</span>
            <span className="mediumFontSize text-danger">-4.69%</span>
          </Card.Body>
        </Card>

        <TokenDetails />

        <div
          className={`p-3 d-md-flex d-none`}
          style={{ gap: '1rem', alignItems: 'stretch', height: '100%' }}
        >
          <div
            style={{
              width: '300px',
              minWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <TradePanel style={{ flex: 1, minHeight: 0 }} />
          </div>

          <div className={`flex-grow-1 d-flex flex-column`} style={{ minHeight: 0 }}>
            <img
              src="/newTradePageGraphImage.png"
              alt="Trading Graph"
              style={{ flexGrow: 1, objectFit: 'cover', width: '100%', minHeight: 0 }}
            />
          </div>
        </div>
      </div>

      <div className="d-md-none d-block p-3">
        <div className="row">
          <div className="col-sm-6 d-sm-block d-none">
            <Orderbook style={{ flex: 1, minHeight: 0 }} />
          </div>
          <div className="col-sm-6">
            <TradePanel style={{ flex: 1, minHeight: 0 }} />
          </div>
        </div>
      </div>

      <div className="d-xl-block d-none">
        <div className="p-3" style={{ width: 'calc(100% - 300px)', marginTop: '-70px' }}>
          <OrdersPanel />
        </div>
      </div>
      <div className="d-xl-none d-block">
        <div className="p-3" style={{ marginTop: '-50px' }}>
          <OrdersPanel />
        </div>
      </div>
    </div>
  )
}

NewTradePage.getLayout = function pageLayout(page) {
  return page
}
