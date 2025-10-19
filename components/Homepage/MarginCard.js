import { usePrivacy } from '@/contexts/PrivacyContext'
import { HiDotsHorizontal } from 'react-icons/hi'
import { PiChartDonutLight } from 'react-icons/pi'
import styles from './Home.module.css'

export default function MarginCard({ icon: Icon, title }) {
  const { privacyMode } = usePrivacy()
  return (
    <div className="col-md-6 row mb-sm-0 mb-5">
      <p className={`fs-5 mb-0 d-flex align-items-center gap-2 ${styles.textColor}`}>
        <Icon className="fs-4" /> {title}
      </p>

      <div className={`col-sm-5 col-12 ${styles.borderEndOnlySm}`}>
        <span className="fs-1 fw-light d-block">
          {privacyMode ? (
            <>
              <HiDotsHorizontal />
              <HiDotsHorizontal style={{ marginLeft: '-5px' }} />
            </>
          ) : (
            '0.00'
          )}
        </span>
        <span className={`${styles.textColor} mediumFontSize`}>Margin available</span>
      </div>

      <div className="col-sm-6 col-12 offset-sm-1 mt-sm-0 mt-3">
        <span className={`${styles.textColor} mediumFontSize d-block mt-2`}>
          Margins used
          {'  '}
          {privacyMode ? (
            <>
              <HiDotsHorizontal />
            </>
          ) : (
            '0.00'
          )}
        </span>
        <span className={`${styles.textColor} mediumFontSize d-block mt-2`}>
          Opening balance
          {'  '}
          {privacyMode ? (
            <>
              <HiDotsHorizontal />
            </>
          ) : (
            '0.00'
          )}
        </span>
        <span className="mediumFontSize text-primary d-block mt-2">
          <PiChartDonutLight /> View statement
        </span>
      </div>
    </div>
  )
}
