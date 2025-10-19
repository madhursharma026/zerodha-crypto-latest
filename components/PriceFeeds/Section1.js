import { Button } from 'react-bootstrap'
import { BsGraphUp } from 'react-icons/bs'
import styles from './pricefeeds.module.css'

export default function Section1() {
  return (
    <>
      <div className={`row mt-5 pt-5 px-4 ${styles.containerSize}`}>
        <div className="col-lg-5 p-0" style={{ margin: 'auto' }}>
          <h6>
            <BsGraphUp className="text-primary" />
            &ensp; Price Feeds
          </h6>
          <h1 style={{ fontSize: '44px' }} className="fw-normal">
            The Universal Price Layer
          </h1>
          <p className="fs-4 mt-4">
            Get pure, real-time market data across every asset class—with more
            symbols and coverage than anywhere else.
          </p>
          <Button variant="dark" className="rounded-pill px-3">
            Get Started
          </Button>
          <Button
            variant="light"
            className="ms-3 rounded-pill border-1 border-secondary px-3"
          >
            Explore Price Feeds
          </Button>
        </div>

        <div className="col-lg-7 text-center p-0 mt-lg-0 mt-5">
          <video
            autoPlay
            muted
            loop
            playsInline
            className={`w-100 ${styles.animationVideo} ${styles.toggleDisplayInLightMode}`}
          >
            <source src="/section1Animation.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <img
            src="/section1AnimationDarkMode.gif"
            alt="Animation"
            className={`w-100 ${styles.animationVideo} ${styles.toggleDisplayInDarkMode}`}
          />
        </div>
      </div>
    </>
  )
}
