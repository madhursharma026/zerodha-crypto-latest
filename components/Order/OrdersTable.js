import { useHoldings } from '@/contexts/HoldingsContext'
import { usePrivacy } from '@/contexts/PrivacyContext'
import { useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'
import { BiDotsHorizontal } from 'react-icons/bi'
import { HiDotsHorizontal } from 'react-icons/hi'
import BuySellCard from '../BuySellCard/BuySellCard'
import styles from './Orders.module.css'

export default function OrdersTable({ data }) {
  const { privacyMode } = usePrivacy()
  const { addHolding, sellHolding } = useHoldings()
  const [modalData, setModalData] = useState(null)

  const openBuySell = (type, item) => {
    const modalItem = {
      id: item.id,
      name: item.Instrument,
      instrument: item.Instrument,
      price: Number(item.LTP),
      qty: item.Qty,
    }
    setModalData({ type, item: modalItem })
  }

  const closeBuySell = () => {
    setModalData(null)
  }

  if (!data || data.length === 0) return null

  return (
    <>
      <Table className={`d-none d-lg-table ${styles.tableStyle}`} hover>
        <thead>
          <tr className="mediumFontSize">
            {['Time', 'Type', 'Instrument', 'Product', 'Qty.', 'LTP', 'Price', 'Status'].map(
              (col) => (
                <th key={col} className={`${styles.textColor} fw-normal`}>
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="mediumFontSize">
              <td>{item.Time}</td>
              <td>
                <span className={`px-2 ${item.Type === 'BUY' ? styles.buyTag : styles.sellTag}`}>
                  {item.Type}
                </span>
              </td>
              <td className={styles.instrumentCell}>
                <span className={styles.instrumentText}>{item.Instrument}</span>
                <Dropdown className={styles.dropdownWrapper}>
                  <Dropdown.Toggle as="span" className={styles.dropdownToggle}>
                    <BiDotsHorizontal size={18} />
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

              <td>{item.Product}</td>
              <td>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                  </>
                ) : (
                  <>{item.Qty}</>
                )}
              </td>
              <td>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                  </>
                ) : (
                  <>{item.LTP}</>
                )}
              </td>
              <td>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                  </>
                ) : (
                  <>{item.Price}</>
                )}
              </td>
              <td>
                <span className={`px-3 ${styles.tag}`}>{item.Status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {modalData && (
        <BuySellCard type={modalData.type} item={modalData.item} onClose={closeBuySell} />
      )}
    </>
  )
}
