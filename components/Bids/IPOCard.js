import { Button, Table } from 'react-bootstrap'
import styles from './Bids.module.css'

export default function IPOTable({ data }) {
  return (
    <Table className={`d-none d-md-table ${styles.tableStyle}`} hover>
      <thead>
        <tr className="mediumFontSize">
          <th className={`${styles.textColor} fw-normal`}>Instrument</th>
          <th className={`${styles.textColor} fw-normal`}>Date</th>
          <th className={`${styles.textColor} fw-normal`}>Price (₹)</th>
          <th className={`${styles.textColor} fw-normal`}>Min. amount (₹)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="mediumFontSize align-middle">
            <td>
              <div className="fw-semibold">{item.instrument}</div>
              <div className={`small ${styles.textColor}`}>{item.description}</div>
            </td>
            <td>
              {item.dateFrom}
              <sup>th</sup> {item.monthFrom} — {item.dateTo}
              <sup>th</sup> {item.monthTo}
            </td>
            <td>{item.priceRange}</td>
            <td>
              <div>{item.minAmount}</div>
              <div className={`small ${styles.textColor}`}>{item.qty} Qty.</div>
            </td>
            <td className="text-end">
              <Button variant="primary" className="rounded-1 px-3 py-1">
                Pre-apply
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
