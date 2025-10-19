import { Card } from 'react-bootstrap'
import styles from './Positions.module.css'

export default function PositionCard({ item }) {
  return (
    <Card className={`mt-3 ${styles.cardStyle}`}>
      <Card.Body>
        <div className="row">
          <div className="col-6 col-sm-4 col-md-3">
            <span>Instrument</span>
            <p className="fw-normal">{item.Instrument}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>Product</span>
            <p className="fw-normal">{item.Product}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>Qty</span>
            <p className="fw-normal">{item.Qty}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>Avg</span>
            <p className="fw-normal">{item.Avg}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>LTP</span>
            <p className="fw-normal">{item.LTP}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>P&L</span>
            <p className="fw-normal">{item.pnl}</p>
          </div>
          <div className="col-6 col-sm-4 col-md-3">
            <span>Chg</span>
            <p className="fw-normal">{item.Chg}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
