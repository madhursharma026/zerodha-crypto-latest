import { usePrivacy } from '@/contexts/PrivacyContext'
import { Card } from 'react-bootstrap'
import { HiDotsHorizontal } from 'react-icons/hi'
import styles from './Orders.module.css'

export default function OrdersCard({ data }) {
  const { privacyMode } = usePrivacy()

  return (
    <>
      {data.map((item) => (
        <Card key={item.id} className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}>
          <Card.Body>
            <span>Time</span>
            <p className="fw-normal">{item.Time}</p>

            <div className="row">
              {['Type', 'Instrument', 'Product', 'Qty', 'LTP', 'Price', 'Status'].map((field) => (
                <div key={field} className="col-6 col-sm-4 col-md-3">
                  <span>{field}</span>
                  <p className="fw-normal">
                    {privacyMode ? (
                      <>
                        <HiDotsHorizontal />
                        <HiDotsHorizontal style={{ marginLeft: '-1px' }} />
                      </>
                    ) : (
                      <>{item[field]}</>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
