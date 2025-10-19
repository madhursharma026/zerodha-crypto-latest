import Image from 'next/image'
import Link from 'next/link'
import { FaRegBell } from 'react-icons/fa'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { IoIosMenu } from 'react-icons/io'
import styles from './Header.module.css'

const MobileHeader = ({ pathname, symbol, toggleTheme, handleShow }) => {
  let pageTitle = ''

  if (!pathname) {
    // fallback while Next.js is resolving pathname
    pageTitle = ''
  } else if (pathname === '/') {
    pageTitle = 'DASHBOARD'
  } else if (symbol) {
    // If dynamic route like /trade/BTC
    pageTitle = symbol.toUpperCase()
  } else {
    // Default: show page name from pathname
    pageTitle = pathname.replace('/', '').toUpperCase()
  }

  return (
    <div
      className={`${styles.headerBoxShadowAfter1125px} containerWidthGlobalCSS px-2 align-items-center justify-content-between py-2`}
    >
      <div className="row">
        <div className="col-4">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={21} height={14} />
          </Link>
        </div>
        <div className="col-4 text-center">
          <span className={`${styles.textColor} fs-5`}>{pageTitle}</span>
        </div>
        <div className="col-4 text-end d-flex justify-content-end align-items-center gap-3">
          <FaRegBell className={`${styles.textColor} d-sm-block d-none`} />
          <FaToggleOff className={`${styles.toggleDisplayInLightMode}`} onClick={toggleTheme} />
          <FaToggleOn
            className={`${styles.toggleDisplayInDarkMode} ${styles.textColor}`}
            onClick={toggleTheme}
          />
          <IoIosMenu
            className={styles.textColor}
            onClick={handleShow}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
