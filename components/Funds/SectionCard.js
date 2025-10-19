import { usePrivacy } from '@/contexts/PrivacyContext'
import { HiDotsHorizontal } from 'react-icons/hi'
import styles from './Funds.module.css'

export default function SectionCard({ items, details }) {
  const { privacyMode } = usePrivacy()

  return (
    <div className={`card rounded-0 ${styles.cardDetails}`}>
      <div className="card-body fs-5">
        {items.map((item) => (
          <div className={styles.itemRow} key={item.label}>
            <span className={styles.textColor}>{item.label}</span>
            <span className={`${item.isNegative ? styles.negative : ''} fs-4 ${styles.textColor}`}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                <>{item.value}</>
              )}
            </span>
          </div>
        ))}

        <hr className="my-3" />

        {details.map((item) => (
          <div className={styles.itemRow} key={item.label}>
            <span className={styles.textColor}>{item.label}</span>
            <span className={styles.textColor}>
              {privacyMode ? (
                <>
                  <HiDotsHorizontal />
                  <HiDotsHorizontal style={{ marginLeft: '-2px' }} />
                </>
              ) : (
                <>{item.value}</>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
