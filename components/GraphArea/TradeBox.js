import { Button, Form } from 'react-bootstrap'
import { FaGear } from 'react-icons/fa6'
import styles from './GraphArea.module.css'

export default function TradeBox() {
  return (
    <div className={styles.tradeContainer}>
      <div className={styles.tradeWrapper}>
        <h6>Trade</h6>
        <div>
          <span className={styles.leverageBox}>20.00x</span>
          <span className={`${styles.leverageBox} bg-secondary ms-2`}>
            <FaGear />
          </span>
        </div>
      </div>

      <div className={styles.tabs}>
        <span className={styles.active}>Market</span>
        <span>Limit</span>
      </div>

      <div className={styles.infoRow}>
        <span>Current Position</span>
        <span>0 ETH</span>
      </div>
      <div className={styles.infoRow}>
        <span>Available to Trade</span>
        <span>0 USDC</span>
      </div>

      <div className={styles.buttonGroup}>
        <Button variant="outline-secondary" className={styles.longBtn}>
          Long
        </Button>
        <Button variant="danger" className={styles.shortBtn}>
          Short
        </Button>
      </div>

      <div className={styles.toggleWrapper}>
        <Form.Check type="switch" label="Take Profit / Stop Loss" />
      </div>

      <button disabled className={`${styles.connectBtn} btn w-100`}>
        Connect Wallet
      </button>

      <div className={styles.detailBox}>
        <div className={styles.detailRow}>
          <span>Order Routing</span>
          <span>AMM</span>
        </div>
        <div className={styles.detailRow}>
          <span>Estimated Price</span>
          <span>$4,182.55</span>
        </div>
        <div className={styles.detailRow}>
          <span>Price Impact</span>
          <span>--</span>
        </div>
        <div className={styles.detailRow}>
          <span>Margin Required</span>
          <span>$0.00</span>
        </div>
        <div className={styles.detailRow}>
          <span>Liquidation Price</span>
          <span>$0.00</span>
        </div>
        <div className={styles.detailRow}>
          <span>Trading Fee</span>
          <span>$0.00</span>
        </div>
      </div>

      <div className={`${styles.accountButtons} ${styles.disabled}`}>
        <Button className="w-100 py-1" variant="dark" style={{ fontSize: '12px' }}>
          Withdraw
        </Button>
        <Button className="w-100 ms-1 py-1" variant="dark" style={{ fontSize: '12px' }}>
          Deposit
        </Button>
      </div>

      <div className={styles.infoRow}>
        <span>Balance</span>
        <span>--</span>
      </div>
      <div className={styles.infoRow}>
        <span>Profit & Loss</span>
        <span>--</span>
      </div>
    </div>
  )
}
