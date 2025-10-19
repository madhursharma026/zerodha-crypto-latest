import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styles from './LeftSidebar.module.css'

export default function SettingsPanel() {
  const [changeType, setChangeType] = useState('close')
  const changeOptions = [
    { label: 'Close price', value: 'close' },
    { label: 'Open price', value: 'open' },
  ]

  const showOptions = [
    'Price change',
    'Price change %',
    'Price direction',
    'Holdings',
    'Notes',
    'Group colors',
  ]

  // controlled checkbox state (all true by default)
  const initialShowState = Object.fromEntries(showOptions.map((s) => [s, true]))
  const [showState, setShowState] = useState(initialShowState)
  const toggleShow = (key) => setShowState((p) => ({ ...p, [key]: !p[key] }))

  const sortOptions = ['%', 'LTP', 'A-Z', 'EXCH']
  const [sortSelected, setSortSelected] = useState('')

  return (
    <div className={styles.filterPanel}>
      {/* CHANGE TYPE */}
      <Row className="align-items-center" style={{ fontSize: '12px' }}>
        <Col xs={4} className="labelCol">
          CHANGE TYPE <span className={styles.info}>ⓘ</span>
        </Col>

        <Col xs={8}>
          <div
            className="d-flex align-items-center mt-2"
            style={{ fontSize: '13px' }}
          >
            {changeOptions.map((opt) => (
              <Form.Check
                key={opt.value}
                inline
                type="radio"
                label={opt.label}
                name="changeType"
                checked={changeType === opt.value}
                onChange={() => setChangeType(opt.value)}
                className="me-3"
              />
            ))}
          </div>
        </Col>
      </Row>

      {/* SHOW */}
      <Row className="mt-3" style={{ fontSize: '13px' }}>
        <Col xs={4} className="labelCol">
          SHOW
        </Col>

        <Col xs={8}>
          <Row>
            {showOptions.map((opt, i) => (
              <Col xs={6} key={i}>
                <Form.Check
                  type="checkbox"
                  label={opt}
                  checked={!!showState[opt]}
                  onChange={() => toggleShow(opt)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <hr className={styles.sep} />

      {/* SORT BY */}
      <Row
        className="align-items-center"
        style={{ fontSize: '12px', marginTop: '-10px' }}
      >
        <Col xs={4} className="labelCol">
          SORT BY
        </Col>

        <Col xs={8} className="mt-3">
          <div className="d-flex gap-2 align-items-center flex-wrap">
            {sortOptions.map((opt) => (
              <Button
                key={opt}
                size="sm"
                variant={
                  sortSelected === opt ? 'secondary' : 'outline-secondary'
                }
                className={styles.sortBtn}
                onClick={() => setSortSelected(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          <div
            className="text-muted mt-1 text-end"
            style={{ fontSize: '10px' }}
          >
            Sort items within a group.
          </div>
        </Col>
      </Row>
    </div>
  )
}
