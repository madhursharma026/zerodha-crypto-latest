// components/TradePanel.js
import { Button, Card, Form } from 'react-bootstrap'
import styles from './NewTradePage.module.css'

const TradePanel = () => {
  return (
    <div
      className={`p-3 ${styles.panel} ${styles.textColor}`}
      style={{ overflowY: 'scroll', height: '730px', scrollbarWidth: 'none' }}
    >
      {/* Long / Short Buttons */}
      <div className={styles.header}>
        <Button variant="success" className={styles.toggleBtn}>
          Long
        </Button>
        <Button variant="outline-light" className={styles.toggleBtn}>
          Short
        </Button>
      </div>

      {/* Tabs */}
      <div className={styles.tabMenu}>
        <span className={`${styles.tab} ${styles.active}`}>Market</span>
        <span className={styles.tab}>Limit</span>
        <span className={styles.tab}>Others ▾</span>
      </div>

      {/* Max */}
      <div className={styles.labelRow}>
        <span className={styles.muted}>Max:</span> <span>0.00 USD</span>
      </div>

      {/* Size Input */}
      <Form.Group className={styles.inputGroup}>
        <Form.Label className={styles.label}>Size</Form.Label>
        <div className={styles.inputWrapper}>
          <Form.Control type="number" className={styles.input} placeholder="0.00" />
          <span className={styles.unit}>BTC ⇄</span>
        </div>
      </Form.Group>

      {/* Leverage */}
      <div className={styles.sliderSection}>
        <span className={styles.label}>Leverage</span>
        <div className={styles.sliderMarks}>
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <Form.Range className={styles.slider} />
      </div>

      {/* Checkboxes */}
      <Form.Check type="checkbox" label="Reduce Only" className={styles.checkbox} />
      <Form.Check type="checkbox" label="TP/SL" className={styles.checkbox} />

      {/* Connect Wallet Button */}
      <Button className={`py-2 ${styles.walletBtn}`}>Connect Wallet</Button>

      {/* Slippage */}
      <div className={styles.slippage}>
        <span>Slippage (Dynamic)</span>
        <span>▾</span>
      </div>

      {/* Liquidation / Position / Fees */}
      <div className={`row mediumFontSize`}>
        <div className="col-6">Liquidation Price</div>
        <div className="col-6 text-end">None</div>
        <div className="col-6 mt-2">Position</div>
        <div className="col-6 text-end mt-2">0</div>
        <div className="col-6 mt-2">Fees</div>
        <div className="col-6 text-end mt-2">-</div>
      </div>

      {/* Banner */}
      <Card className={`mt-3 ${styles.NewTradePageBG} text-white`}>
        <Card.Body className="px-2 pt-2 pb-1 border rounded-2 border-primary">
          <h6>
            USDC <span className="brandGreenColor">3.67% APY</span>
          </h6>
          <span className="mediumFontSize">Earn APY on USDC with or without trading.</span>{' '}
          <span className="brandGreenColor mediumFontSize">Deposit Now!</span>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TradePanel
