import { usePrivacy } from '@/contexts/PrivacyContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { CgSupport } from 'react-icons/cg'
import { CiCircleQuestion, CiLogout } from 'react-icons/ci'
import { FaRegBell, FaToggleOff, FaToggleOn } from 'react-icons/fa6'
import { FiUserPlus } from 'react-icons/fi'
import { MdOutlineKeyboardCommandKey } from 'react-icons/md'
import { RiBitCoinLine } from 'react-icons/ri'
import { TbDashboard } from 'react-icons/tb'
import CryptoPrices from './CryptoPrices'
import styles from './Header.module.css'

export default function DesktopHeader({ btcPrice, ethPrice, menuItems, pathname, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { privacyMode, togglePrivacy } = usePrivacy() // ✅ Context

  const toggleDropdown = () => setOpen(!open)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.headerBoxShadow}>
      <div className="containerWidthGlobalCSS px-sm-2 px-4 align-items-center justify-content-between">
        <Row>
          <Col className={styles.leftColumn}>
            <CryptoPrices btcPrice={btcPrice} ethPrice={ethPrice} privacyMode={privacyMode} />
          </Col>

          <Col xs="auto" className={styles.verticalDivider}></Col>

          <Col>
            <div className={styles.verticalCenterText}>
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={21} height={14} />
              </Link>

              <div className="w-100 text-end">
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

                <span
                  className={`mediumFontSize px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor}`}
                >
                  <FaRegBell />
                </span>

                <div className="d-inline-block position-relative" ref={dropdownRef}>
                  <span
                    onClick={toggleDropdown}
                    className={`mediumFontSize px-xl-3 px-2 ${styles.navMenuHoverStyle} ${styles.textColor}`}
                  >
                    XXX123
                  </span>

                  {open && (
                    <div className={`${styles.dropdownContainer} text-start mt-2`}>
                      <div className={styles.userHeader}>
                        <div className="fs-5 fw-lighter">Madhur Sharma</div>
                        <div className="smallFontSize">test@gmail.com</div>
                      </div>

                      {/* ✅ Privacy Mode Toggle */}
                      <div className={`${styles.privacyRow} fw-normal px-3 py-1`}>
                        <span>Privacy mode</span>
                        <span
                          className="fs-5"
                          onClick={togglePrivacy}
                          style={{ cursor: 'pointer' }}
                        >
                          {privacyMode ? <FaToggleOn /> : <FaToggleOff />}
                        </span>
                      </div>

                      <div className={`${styles.dropdownItem} px-3 py-1`}>
                        <TbDashboard style={{ marginTop: '-4px' }} /> Console
                      </div>
                      <div className={`${styles.dropdownItem} px-3 py-1`}>
                        <RiBitCoinLine style={{ marginTop: '-4px' }} /> Coin
                      </div>
                      <div className={`${styles.dropdownItem} px-3 py-1`}>
                        <CgSupport style={{ marginTop: '-4px' }} /> Support
                      </div>
                      <div className={`${styles.dropdownItem} px-3 py-1`}>
                        <FiUserPlus style={{ marginTop: '-4px' }} /> Invite Friends
                      </div>
                      <hr className="mt-1 mb-2" />
                      <div
                        className={`${styles.dropdownItem} px-3 py-1`}
                        style={{ marginTop: '-5px' }}
                      >
                        <MdOutlineKeyboardCommandKey style={{ marginTop: '-4px' }} /> Keyboard
                        Shortcuts
                      </div>
                      <div className={`${styles.dropdownItem} px-3 py-1`}>
                        <CiCircleQuestion style={{ marginTop: '-4px' }} /> User manual
                      </div>
                      <div className={`${styles.dropdownItem} px-3 py-1 mb-2`}>
                        <CiLogout style={{ marginTop: '-4px' }} /> Logout
                      </div>
                    </div>
                  )}
                </div>

                <span
                  className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInLightMode}`}
                  onClick={toggleTheme}
                >
                  <FaToggleOff />
                </span>

                <span
                  className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInDarkMode} ${styles.textColor}`}
                  onClick={toggleTheme}
                >
                  <FaToggleOn />
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
