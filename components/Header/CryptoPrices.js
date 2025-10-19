import useCryptoPrice from '@/hooks/useCryptoPrice'
import styles from './Header.module.css'

const CryptoPrices = () => {
  const { btcPrice, btcChange, btcPercent, ethPrice, ethChange, ethPercent } = useCryptoPrice()

  const getColorClass = (value) => (parseFloat(value) >= 0 ? 'brandGreenColor' : 'brandRedColor')
  const formatChange = (value) => (parseFloat(value) >= 0 ? `+${value}` : value)

  const renderPrice = (price, change, percent) => {
    if (!price || price === 'Loading...') {
      return (
        <div className="d-flex flex-column gap-1">
          <span className={styles.skeleton}></span>
        </div>
      )
    }

    return (
      <>
        <span className={getColorClass(change)}>{price}</span>{' '}
        <span className="smallFontSize">
          {formatChange(change)} ({formatChange(percent)}%)
        </span>
      </>
    )
  }

  return (
    <div className={`d-flex flex-wrap gap-3 ${styles.customFlexGap}`}>
      <div className={`mediumFontSize ${styles.textColor}`}>
        BTC <br className={styles.whenWillBRCome} />
        <span style={{ display: 'inline-block' }}>
          {renderPrice(btcPrice, btcChange, btcPercent)}
        </span>
      </div>

      <div className={`mediumFontSize ${styles.textColor}`}>
        ETH <br className={styles.whenWillBRCome} />
        <span style={{ display: 'inline-block' }}>
          {renderPrice(ethPrice, ethChange, ethPercent)}
        </span>
      </div>
    </div>
  )
}

export default CryptoPrices
