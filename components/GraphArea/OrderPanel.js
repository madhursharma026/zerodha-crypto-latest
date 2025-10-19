import styles from './GraphArea.module.css'

export default function OrdersPanel() {
  return (
    <>
      <div className={`mt-5 ${styles.ordersContainer}`}>
        <div className={styles.header}>
          <span className={styles.title}>Orders</span>
          <div className={styles.rightControls}>
            <span className={styles.collapse}>Collapse</span>
            <span className={styles.filter}>Filter</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <span className={`${styles.tab} ${styles.active}`}>All Positions</span>
          <span className={styles.tab}>Open Orders</span>
          <span className={styles.tab}>History</span>
        </div>

        <div className={styles.emptyState}>Connect your wallet to see your positions</div>
      </div>
    </>
  )
}
