import Image from 'next/image'
import { BsDatabase, BsGraphUp, BsLayers, BsShieldCheck } from 'react-icons/bs'
import { PiPiggyBank } from 'react-icons/pi'
import styles from './pricefeeds.module.css'

export default function MarketEdge() {
  return (
    <div className="my-5 px-4">
      <div className={`my-5 py-5 ${styles.containerSize}`}>
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h6 className="d-flex align-items-center">
              <BsGraphUp className="text-primary me-2" />
              ASSET CLASS
            </h6>
            <h1 className="fw-normal pe-5" style={{ fontSize: '40px' }}>
              Tailor your market edge
            </h1>
          </div>

          <div className="col-xl-4 col-lg-6 d-flex flex-column justify-content-center mt-lg-0 mt-5">
            <p className="fs-5 pt-4">
              Select between Pyth Core for broad coverage or Pyth Lazer for
              ultra-low latency needs.
            </p>
          </div>

          <div className="col-lg-6 mt-5">
            <div
              className="card border-0 rounded-5 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #E8E3F9 0%, #FBE9E7 100%)',
              }}
            >
              <div className="card-body p-md-5 p-4">
                {/* Logo */}
                <div className="text-end">
                  <Image
                    src="/coreLogo.png"
                    alt="Core Logo"
                    width={120}
                    height={120}
                    className="img-fluid"
                  />
                </div>

                {/* Heading */}
                <h2 className="mt-4">Core</h2>

                {/* Description */}
                <p className="fs-5 text-secondary">
                  Secure and decentralized price data for a broad spectrum of
                  use cases.
                </p>

                {/* Features List */}
                <div className="mt-4">
                  <div className="d-flex align-items-start mb-3">
                    <BsShieldCheck size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Securely decentralized</h5>
                      <p className="h5 fw-normal text-muted">
                        Achieve both stability and trustlessness.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <BsLayers size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Transparent aggregation</h5>
                      <p className="h5 fw-normal text-muted">
                        Have conviction in the prices you use.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <PiPiggyBank size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Cost efficient</h5>
                      <p className="h5 fw-normal text-muted">
                        Designed for DeFi and beyond.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <BsDatabase size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Robust data</h5>
                      <p className="h5 fw-normal text-muted">
                        Open, permissionless data for any app.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button className="btn btn-dark rounded-pill px-4 mt-4">
                  Integrate with Core
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <div
              className="card border-0 rounded-5 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #E8E3F9 0%, #FBE9E7 100%)',
              }}
            >
              <div className="card-body p-md-5 p-4">
                {/* Logo */}
                <div className="text-end">
                  <Image
                    src="/coreLogo.png"
                    alt="Core Logo"
                    width={120}
                    height={120}
                    className="img-fluid"
                  />
                </div>

                {/* Heading */}
                <h2 className="mt-4">Lazer</h2>

                {/* Description */}
                <p className="fs-5 text-secondary">
                  Specialized market data service for highly latency-sensitive
                  applications.
                </p>

                {/* Features List */}
                <div className="mt-4">
                  <div className="d-flex align-items-start mb-3">
                    <BsShieldCheck size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>1ms update frequency</h5>
                      <p className="h5 fw-normal text-muted">
                        Faster than the blink of an eye.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <BsLayers size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Custom throttling</h5>
                      <p className="h5 fw-normal text-muted">
                        Get updates at the frequency you need.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <PiPiggyBank size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>Deep market data</h5>
                      <p className="h5 fw-normal text-muted">
                        Aggregate price, bid-ask, market depth, and more.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <BsDatabase size={20} className="me-2 mt-1 text-dark" />
                    <div>
                      <h5>On-chain & off-chain</h5>
                      <p className="h5 fw-normal text-muted">
                        Your specialized solution for performance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button className="btn btn-dark rounded-pill px-4 mt-4">
                  Integrate with Lazer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
