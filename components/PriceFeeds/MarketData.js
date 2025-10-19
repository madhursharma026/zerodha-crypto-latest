import { Button } from 'react-bootstrap'
import { BsGraphUp } from 'react-icons/bs'
import styles from './pricefeeds.module.css'

export default function MarketData() {
  return (
    <>
      <div
        className={`mt-5 ${styles.containerSize}`}
        style={{
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          className="row"
          style={{
            maxWidth: '1300px',
            width: '100%',
          }}
        >
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h6 className="d-flex align-items-center">
              <BsGraphUp className="text-primary me-2" />
              first-party data
            </h6>
            <h1 className="fw-normal pe-5" style={{ fontSize: '40px' }}>
              Verifiable market data
              <br />
              <span
                style={{
                  background:
                    'radial-gradient(50% 232% at 1.2% 50%, rgb(139, 92, 246) 0%, rgb(249, 115, 22) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Directly from institutions
              </span>
            </h1>
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-center mt-lg-0 mt-5">
            <p className="fs-5 pt-4">
              Not all data is created equal. Pyth sources prices directly from
              financial institutions to deliver unmatched accuracy and
              transparency.
            </p>
            <div>
              <Button
                variant="dark"
                className="rounded-pill px-4 py-2 fw-semibold"
              >
                Get Started
              </Button>

              <Button
                variant="light"
                className="ms-sm-3 rounded-pill mt-sm-0 mt-2 border border-secondary px-4 py-2 fw-semibold"
              >
                Explore Price Feeds
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`px-4 ${styles.containerSize}`}>
        <div className="row">
          <div className="col-6">
            <h5 className="fw-bold">
              Publishers{' '}
              <span
                className="bg-black text-white px-2 fw-normal rounded-pill"
                style={{ fontSize: '14px' }}
              >
                125+
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
