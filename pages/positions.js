import PositionCard from '@/components/Positions/PositionCard'
import PositionRow from '@/components/Positions/PositionRow'
import styles from '@/components/Positions/Positions.module.css'
import Head from 'next/head'
import { Col, Table } from 'react-bootstrap'

export default function Positions() {
  const positionsData = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    Product: 'XXXX',
    Instrument: 'XXXX XXXX XXXX XXXX',
    Qty: '0',
    Avg: '0000.00',
    LTP: '0000.00',
    pnl: '00.00',
    Chg: '0.00%',
  }))
  return (
    <>
      <Head>
        <title>Positions | Exolane</title>
      </Head>
      <Col
        className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
      >
        <div className={styles.rightColumn}>
          <p className="fs-5 pt-3">Positions ({positionsData.length})</p>

          {/* Desktop Table */}
          <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
            <thead>
              <tr className="mediumFontSize">
                <th className={`${styles.textColor} fw-normal`}>#</th>
                <th className={`${styles.textColor} fw-normal`}>Products</th>
                <th className={`${styles.textColor} fw-normal`}>Instrument</th>
                <th className={`${styles.textColor} fw-normal`}>Qty.</th>
                <th className={`${styles.textColor} fw-normal`}>Avg</th>
                <th className={`${styles.textColor} fw-normal`}>LTP</th>
                <th className={`${styles.textColor} fw-normal`}>P&L</th>
                <th className={`${styles.textColor} fw-normal`}>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {positionsData.map((item) => (
                <PositionRow key={item.id} item={item} />
              ))}
            </tbody>
          </Table>

          {/* Mobile Cards */}
          <div className="d-block d-lg-none">
            {positionsData.map((item) => (
              <PositionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Col>
    </>
  )
}
