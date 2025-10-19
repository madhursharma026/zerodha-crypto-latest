import Image from 'next/image'
import Link from 'next/link'
import { Offcanvas } from 'react-bootstrap'
import { FaRegBell } from 'react-icons/fa6'
import styles from './Header.module.css'

const OffcanvasMenu = ({ show, handleClose, menuItems, pathname }) => (
  <Offcanvas show={show} onHide={handleClose} className={styles.headerOffCanvasDisplay}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={21} height={14} />
        </Link>
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <div className="d-flex flex-column">
        {menuItems.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`mediumFontSize text-decoration-none px-xl-3 px-2 ${
              styles.navMenuHoverStyle
            }  ${pathname === href ? 'brandRedColor' : `${styles.textColor}`}`}
          >
            {label}
          </Link>
        ))}
        <div className="d-flex align-items-center gap-3 mt-3 px-1 d-sm-none d-block">
          <FaRegBell className={styles.textColor} />
        </div>
        <p className={`mediumFontSize pt-3 ${styles.textColor}`}>XXX123</p>
      </div>
    </Offcanvas.Body>
  </Offcanvas>
)

export default OffcanvasMenu
