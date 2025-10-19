import styles from './Tabs.module.css'

const Tabs = ({ tabsName, activeTab }) => {
  return (
    <div className={styles.tabContainer}>
      {tabsName.map((tab) => (
        <div
          key={tab}
          className={`${styles.tabItem} px-3 mediumFontSize ${
            activeTab === tab ? styles.active : ''
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

export default Tabs
