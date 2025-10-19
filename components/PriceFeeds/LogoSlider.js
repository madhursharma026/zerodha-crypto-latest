import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './pricefeeds.module.css'

const logos = [
  'https://framerusercontent.com/images/DNhDSiYpBdWXyO8UjnYNSD8C9Y.svg?scale-down-to=512',
  'https://framerusercontent.com/images/qbAFwaUuNekpH0YXCqCXtmDbGI.svg?scale-down-to=512',
  'https://framerusercontent.com/images/VN0yNdw5kdzqgnigxFCwW8G9uMw.svg',
  'https://framerusercontent.com/images/rY2XXfA1qJUDuuq2izS0upWos2I.svg?scale-down-to=512',
  'https://framerusercontent.com/images/CYyoDqsGp2Wewzrp9ty1wbXrM.svg',
  'https://framerusercontent.com/images/2jM6w11o9Po9SL4nnHf178oc.svg?scale-down-to=512',
  'https://framerusercontent.com/images/UpqTRBGwImYQ4VVE3iIFcFRX4I.svg?scale-down-to=512',
  'https://framerusercontent.com/images/ZqN0ToNDnkh6rR0thE3j6CaTaDM.svg',
  'https://framerusercontent.com/images/XxAHzGNMKOYniqtQ9TTi0ZiStRk.svg?scale-down-to=512',
  'https://framerusercontent.com/images/858bN4Sip6d8zBNwXioAlHtyB8.svg?scale-down-to=512',
  'https://framerusercontent.com/images/dTGdsJobWZlQIRNUuRGYNqEXZI.svg?scale-down-to=512',
  'https://framerusercontent.com/images/xQkzTFQQAJ5kRRWf11ezfAZHeE.svg',
]

export default function LogoSlider() {
  const trackRef = useRef(null)
  const speed = useRef(1) // normal speed

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

  return (
    <div
      className={`${styles.slider} pt-5 mt-md-5`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.slideTrack} ref={trackRef}>
        {[...logos, ...logos].map((logo, index) => (
          <div className={styles.slide} key={index}>
            <Image src={logo} alt={`logo-${index}`} width={120} height={60} />
          </div>
        ))}
      </div>
    </div>
  )
}
