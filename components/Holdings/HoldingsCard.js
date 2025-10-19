import { usePrivacy } from '@/contexts/PrivacyContext'
import { Card } from 'react-bootstrap'
import { HiDotsHorizontal } from 'react-icons/hi'
import styles from './Holdings.module.css'

export default function HoldingsCard({ item }) {
  const { privacyMode } = usePrivacy()

  const fields = [
    { label: 'Qty.', value: item.qty },
    { label: 'Avg. cost', value: item.avgCost },
    { label: 'LTP', value: item.ltp },
    { label: 'Invested', value: item.invested },
    { label: 'Cur. Val', value: item.currentVal },
    { label: 'P&L', value: item.pnl, color: item.pnlColor },
    { label: 'Net Chg.', value: item.netChg, color: item.netChgColor },
    { label: 'Day Chg.', value: item.dayChg, color: item.dayChgColor },
  ]

  return (
    <Card className={`mt-3 d-block d-lg-none ${styles.cardStyle}`}>
      <Card.Body>
        <span>Instrument</span>
        <p className="fw-normal">{item.instrument}</p>
        <div className="row">
          {fields.map((f, i) => (
            <div key={i} className="col-6 col-sm-4 col-md-3">
              <span>{f.label}</span>
              <p className="fw-normal" style={{ color: f.color || styles.textColor }}>
                {privacyMode ? (
                  <>
                    <HiDotsHorizontal />
                    <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                  </>
                ) : (
                  <>{f.value}</>
                )}
              </p>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}
