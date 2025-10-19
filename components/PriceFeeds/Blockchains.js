import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { BsGraphUp } from 'react-icons/bs'
import styles from './pricefeeds.module.css'

export default function Blockchains() {
  const trackRef = useRef(null)
  const speed = useRef(1)

  useEffect(() => {
    let pos = 0
    const track = trackRef.current
    let animationFrame

    const move = () => {
      if (track) {
        pos -= speed.current
        // Loop infinitely
        if (pos <= -track.scrollWidth / 2) pos = 0
        track.style.transform = `translateX(${pos}px)`
      }
      animationFrame = requestAnimationFrame(move)
    }

    move()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const handleMouseEnter = () => {
    speed.current = 0.3 // slow down on hover
  }
  const handleMouseLeave = () => {
    speed.current = 1 // normal speed
  }

  const logos = Array(40).fill(
    'https://framerusercontent.com/images/2SyYPkukKqDCGMaljtxAJaakJc.svg'
  )

  return (
    <div
      className="mt-4 px-4"
      style={{
        background: 'var(--token-7db5fac7-9a07-4c06-a3d4-e1a280581de2,#000)',
      }}
    >
      <div
        className="text-white mt-5 pt-5"
        style={{
          maxWidth: '1300px',
          margin: 'auto',
        }}
      >
        <h6 className="d-flex align-items-center mt-5 pt-md-5">
          <BsGraphUp className="text-primary me-2" />
          Available Everywhere
        </h6>
        <h1 className="fw-normal pe-5 mt-5" style={{ fontSize: '40px' }}>
          Verifiable market data
          <br />
          <span
            style={{
              background:
                'radial-gradient(50% 231.99999999999997% at 1.2% 50%, var(--token-dd9cb368-2299-4381-81fe-a19de4a94c50, rgb(139, 92, 246)) 0%, var(--token-13dafb25-767d-4ef9-9b03-f9fb065e9e2d, rgb(6, 182, 212)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Directly from institutions
          </span>
        </h1>
        <div className="row mt-5">
          <div className="col-lg-6 text-center">
            <Image
              src="/blockchainLogo.png"
              alt={`#ImgNotFound`}
              width={500}
              height={500}
              className="img-fluid"
            />
          </div>

          <div className="col-lg-6" style={{ margin: 'auto' }}>
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
        </div>
      </div>
      <div
        className={`${styles.slider} py-5 mt-md-5`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.slideTrack} ref={trackRef}>
          {[...logos, ...logos].map((logo, index) => (
            <div key={index}>
              <Image src={logo} alt={`logo-${index}`} width={40} height={40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
