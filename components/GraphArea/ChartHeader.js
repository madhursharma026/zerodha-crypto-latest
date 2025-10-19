import { useState } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import { MdOutlineCandlestickChart, MdOutlineShowChart } from 'react-icons/md'
import styles from './GraphArea.module.css'

const ChartHeader = ({ activeTime, setActiveTime }) => {
  const [activeTab, setActiveTab] = useState('Price')
  const [activeGraphTab, setActiveGraphTab] = useState('line')
  const timeFrames = ['1D', '7D', '1M', '1Y', 'All']
  const activeIndex = timeFrames.indexOf(activeTime)
  const [active, setActive] = useState('Charts')

  return (
    <div name="section1 mt-4">
      <div className={`mt-4 ${styles.chartHeaderContainer}`} id="Charts">
        <div className={styles.leftGroup}>
          <ButtonGroup className={styles.tabGroup}>
            {['Price', 'Market cap'].map((tab) => (
              <button
                key={tab}
                className={`${
                  activeTab === tab ? styles.chartHeaderActiveTab : styles.chartHeaderTab
                } btn`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </ButtonGroup>

          <ButtonGroup className={`${styles.tabGroup} ms-2`}>
            <button
              className={`${
                activeGraphTab === 'line' ? styles.chartHeaderActiveTab : styles.chartHeaderTab
              } btn`}
              onClick={() => setActiveGraphTab('line')}
            >
              <MdOutlineShowChart />
            </button>
            <button
              className={`${
                activeGraphTab === 'candle' ? styles.chartHeaderActiveTab : styles.chartHeaderTab
              } btn`}
              onClick={() => setActiveGraphTab('candle')}
            >
              <MdOutlineCandlestickChart />
            </button>
          </ButtonGroup>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.chartTabWrapper} style={{ '--active-index': activeIndex }}>
            <ButtonGroup className={styles.chartTabGroup}>
              {timeFrames.map((time) => (
                <button
                  key={time}
                  className={`btn ${activeTime === time ? styles.chartActiveTab : ''}`}
                  onClick={() => setActiveTime(time)}
                >
                  {time}
                </button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartHeader
