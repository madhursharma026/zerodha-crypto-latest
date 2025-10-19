import { Card } from 'react-bootstrap'
import { FaEthereum } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import styles from './NewTradePage.module.css'

export default function TokenDetails() {
  const infoItems = [
    { label: 'Oracle', value: '$109,036' },
    { label: 'Funding/ Last 24h (APR)', value: '-11.61% / 3.17%' },
    { label: 'Open Interest', value: '$108M' },
    { label: '24h Volume', value: '$115M' },
    { label: 'About Market', value: 'View Details' },
  ]

  return (
    <Card className={`${styles.tokenDetailsCard} ${styles.NewTradePageCardBG} text-white`}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.container}>
          <span className={`rounded-2 ${styles.menuBtn}`}>
            <FaEthereum size={20} />
            ETH-USD
            <MdKeyboardArrowDown size={16} />
          </span>

          <div className={styles.priceLarge}>$4,179.24</div>

          <div className={styles.infoGroup}>
            {infoItems.map((item) => (
              <InfoItem key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <small className={styles.label}>{label}</small>
    <span className={styles.value}>{value}</span>
  </div>
)
