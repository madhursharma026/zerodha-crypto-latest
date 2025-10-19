import { Button } from 'react-bootstrap'
import { BsGraphUp } from 'react-icons/bs'
import styles from './pricefeeds.module.css'

export default function AssestClass() {
  return (
    <>
      <div
        className={`mt-5 ${styles.containerBgForLightMode}`}
        style={{
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
        }}
      >
        <div className={`${styles.containerSize} row`}>
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h6 className="d-flex align-items-center">
              <BsGraphUp className="text-primary me-2" />
              ASSET CLASS
            </h6>
            <h1 className="fw-normal pe-5" style={{ fontSize: '40px' }}>
              Market data that enables you to move before the market
            </h1>
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-center mt-lg-0 mt-5">
            <p className="fs-5 pt-4">
              Turn market data into your edge. Pyth taps directly into price
              discovery—from exchanges, trading venues, and market makers—to
              deliver the price of everything, everywhere.
            </p>
          </div>
        </div>
      </div>

      <div className={`mt-5 px-4 ${styles.containerSize}`}>
        <div className="row">
          <div className="col-6">
            <h5 className="fw-normal">
              Price Feeds{' '}
              <span
                className="bg-black text-white px-2 fw-normal rounded-pill"
                style={{ fontSize: '14px' }}
              >
                1930+
              </span>
            </h5>
          </div>
          <div className="col-6 text-end">
            <Button
              className="border-1 border-secondary rounded-pill fw-semibold px-3"
              variant="light"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
