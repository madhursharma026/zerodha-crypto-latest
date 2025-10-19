import { useEffect, useRef } from 'react'
import CurrencyCard from './CurrencyCard'
import styles from './pricefeeds.module.css'

const InfiniteSlider = () => {
  const trackRef = useRef(null)
  const pos = useRef(0)
  const speed = useRef(0.5)
  
    const data = [
      {
        title: 'Hyperliquid',
        pair: 'HYPE/USD',
        value: '53.6752',
        icon: 'https://framerusercontent.com/images/STN2P0OWJpIKFj8cRBP6yiaTQc.svg',
      },
      {
        title: 'Solana',
        pair: 'SOL/USD',
        value: '219.0414',
        icon: 'https://framerusercontent.com/images/STN2P0OWJpIKFj8cRBP6yiaTQc.svg',
      },
      {
        title: 'USD Coin',
        pair: 'USDC/USD',
        value: '0.9998',
        icon: 'https://framerusercontent.com/images/STN2P0OWJpIKFj8cRBP6yiaTQc.svg',
      },
      {
        title: 'Euro',
        pair: 'EUR/USD',
        value: '1.1709',
        icon: 'https://framerusercontent.com/images/STN2P0OWJpIKFj8cRBP6yiaTQc.svg',
      },
      {
        title: 'British Pounds',
        pair: 'GBP/USD',
        value: '1.3535',
        icon: 'https://framerusercontent.com/images/STN2P0OWJpIKFj8cRBP6yiaTQc.svg',
      },
    ]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationFrame

    const move = () => {
      pos.current -= speed.current
      if (pos.current <= -track.scrollWidth / 2) {
        pos.current = 0
      }
      track.style.transform = `translateX(${pos.current}px)`
      animationFrame = requestAnimationFrame(move)
    }

    move()
    return () => cancelAnimationFrame(animationFrame)
  }, [data])

  return (
    <div className={styles.sliderWrapper2}>
      <div className={styles.gradientOverlayLeft}></div>
      <div className={styles.gradientOverlayRight}></div>

      <div className={styles.slider}>
        <div className={styles.slideTrack} ref={trackRef}>
          {[...data, ...data].map((item, index) => (
            <CurrencyCard
              key={index}
              title={item.title}
              pair={item.pair}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfiniteSlider
