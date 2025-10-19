import { Card } from 'react-bootstrap'
import { FaBars, FaEthereum } from 'react-icons/fa'
import styles from './GraphArea.module.css'

export default function TokenDetails() {
  const infoItems = [
    { label: 'Oracle Price', value: '$4,179.23' },
    { label: '24h Change', value: '0.40%' },
    { label: '24h Low', value: '$4,119.14' },
    { label: '24h High', value: '$4,228.81' },
    { label: '24h Volume', value: '$247.16K' },
    { label: 'Open Interest', value: '$9.85K' },
  ]

  return (
    <Card className={`my-2 mx-3 ${styles.tokenDetailsCard} rounded-0`}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.container}>
          <span className={`rounded-2 ${styles.menuBtn}`}>
            <FaEthereum size={20} />
            ETH-USD
            <FaBars size={16} />
          </span>

          <div className={styles.priceLarge}>$4,179.24</div>

          <div className={styles.infoGroup}>
            {infoItems.map((item) => (
              <InfoItem key={item.label} label={item.label} value={item.value} />
            ))}

            <FundingRate label="Funding Rate" redValue="0.0060%" greenValue="0.0054%" />
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

const FundingRate = ({ label, redValue, greenValue }) => (
  <div className={styles.infoItem}>
    <small className={styles.label}>{label}</small>
    <div className={styles.fundingRate}>
      <span className={styles.fundingRateRed}>{redValue}</span>
      <span className={styles.fundingRateGreen}>{greenValue}</span>
    </div>
  </div>
)
