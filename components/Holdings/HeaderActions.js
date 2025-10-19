import { Form, InputGroup } from 'react-bootstrap'
import { CiLock } from 'react-icons/ci'
import { FaUsers } from 'react-icons/fa'
import { LiaChartPieSolid } from 'react-icons/lia'
import { MdDownload } from 'react-icons/md'
import { SlMagnifier } from 'react-icons/sl'
import styles from './Holdings.module.css'

export default function HeaderActions({ count, searchTerm, setSearchTerm, onDownload }) {
  return (
    <div
      className={`d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3 ${styles.responsiveContainer}`}
    >
      <div className="d-flex align-items-center flex-wrap gap-2">
        <span className={styles.fs6Text}>Holdings ({count})</span>
        <Form.Select className={styles.filterSelect}>
          <option>All Equity</option>
          <option value="1">MFT</option>
          <option value="2">Kite Only</option>
          <option value="3">Smallcase</option>
        </Form.Select>
      </div>

      <div className="d-flex align-items-center flex-wrap gap-2">
        <InputGroup className={`${styles.searchGroup} d-sm-flex d-none`}>
          <InputGroup.Text className={styles.inputGroupText}>
            <SlMagnifier />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            className={styles.searchInput}
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <span
          className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
        >
          <CiLock /> Authorisation
        </span>
        <span
          className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
        >
          <FaUsers /> Family
        </span>
        <span
          className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
        >
          <LiaChartPieSolid /> Analytics
        </span>
        <span
          onClick={onDownload} // ✅ Trigger download
          style={{ cursor: 'pointer' }}
          className={`d-flex align-items-center text-primary gap-1 mediumFontSize ${styles.iconLink}`}
        >
          <MdDownload /> Download
        </span>
      </div>
    </div>
  )
}
