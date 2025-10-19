import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './pricefeeds.module.css'

const pathVariants = {
  animate: {
    pathLength: [0, 1, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
}

const CurrencyCard = ({ icon, pair, title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="col-md-4 col-lg-2 mb-4 ms-3"
      style={{
        flex: '0 0 auto',
        width: '100%',
        maxWidth: '320px',
        aspectRatio: '3 / 4.4',
      }}
    >
      <Link href="#" className={styles.card}>
        <div className={styles.blurLayer}></div>
        <div className="d-flex align-items-center mb-3">
          <div className={styles.iconWrapper}>
            <img src={icon} alt={pair} className={styles.icon} />
          </div>
          <div className="ms-2 text-start">
            <div className={styles.pairText}>{pair}</div>
            <div className={styles.titleText}>{title}</div>
          </div>
        </div>
        <svg
          width="100%"
          height="120"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          style={{ margin: 'auto' }}
        >
          <motion.path
            d="M0,25 Q10,15 20,20 T40,15 T60,25 T80,20 T100,25"
            fill="transparent"
            stroke="#131F37"
            strokeWidth="2"
            variants={pathVariants}
            animate="animate"
          />
        </svg>
        <div className={styles.valueText}>{value}</div>
      </Link>
    </motion.div>
  )
}

export default CurrencyCard
