import { Button } from 'react-bootstrap'
import LogoSlider from './LogoSlider'

export default function Reliable() {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: '#6D28D9',
      }}
    >
      <div
        style={{
          maxWidth: '1300px',
          margin: 'auto',
        }}
      >
        <div
          style={{
            height: '100%', // full viewport height
            width: '100%',
            backgroundImage:
              'url("https://framerusercontent.com/images/8vKnTXuS172nqWU2xZVgJkwMTg.svg?width=702&height=702")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'flex-end', // align content to bottom
            paddingBottom: '40px', // space from bottom
            paddingTop: '40vh',
          }}
        >
          <div className="row w-100">
            <div className="col-lg-6">
              <h6 className="d-flex align-items-center text-white">
                Get Started
              </h6>
              <h1
                className="fw-normal pe-5 text-white"
                style={{ fontSize: '40px' }}
              >
                Reliable. Real-time. Secure
                <br />
                Get the edge you deserve{' '}
              </h1>
            </div>

            <div className="col-lg-6 mt-lg-0 mt-3">
              <p className="fs-5 text-white pt-4">
                Start building with Pyth today. Explore the docs or visit
                Insights Hub to access reliable, real-time data for your
                applications.
              </p>
              <div>
                <Button variant="light" className="rounded-pill px-3 py-2">
                  Get Started
                </Button>

                <Button
                  style={{ background: 'transparent' }}
                  className="ms-3 fw-semibold rounded-pill border border-secondary px-3 py-2"
                >
                  Explore Price Feeds
                </Button>
              </div>
            </div>
            <LogoSlider />
          </div>
        </div>
      </div>
    </div>
  )
}
