import useTheme from '@/hooks/useTheme'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { IoMenuSharp } from 'react-icons/io5'
import styles from './pricefeeds.module.css'

function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={styles.navbar}>
      {/* Desktop Navbar */}
      <Navbar
        expand="xl"
        className={`${styles.priceFeedsContainerWidth} d-xl-block d-none`}
        style={{ zIndex: 1000 }} // add z-index
      >
        <Container fluid className="px-4">
          <Link href="/">
            <Image
              src="/pythLogoLightMode.png"
              className={`${styles.toggleDisplayInLightMode}`}
              alt="Pyth Logo"
              width={83}
              height={17}
              priority
            />
            <Image
              src="/pythLogoDarkMode.png"
              className={`${styles.toggleDisplayInDarkMode}`}
              alt="Pyth Logo"
              width={83}
              height={17}
              priority
            />
          </Link>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="gap-2 pt-2">
              {[
                { href: '#Products', label: 'Products' },
                { href: '#Partners', label: 'Partners' },
                { href: '#Ecosystem', label: 'Ecosystem' },
                { href: '#Developers', label: 'Developers' },
                { href: '#Community', label: 'Community' },
                { href: '#Resources', label: 'Resources' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-decoration-none px-2 ${styles.navMenus} rounded-pill`}
                  style={{ zIndex: '1000' }} // add z-index
                >
                  {item.label}
                </Link>
              ))}
              <Link href="#m">
                <Image
                  src="/twitterLogoDarkMode.png"
                  alt="Twitter"
                  width={20}
                  height={18}
                  className={`${styles.toggleDisplayInDarkMode} me-2`}
                />
                <Image
                  src="/twitterLogoImage.png"
                  alt="Twitter"
                  width={20}
                  height={18}
                  className={`${styles.toggleDisplayInLightMode} me-2`}
                />
              </Link>
              <Link href="#">
                <Image
                  src="/githubLogoDarkMode.png"
                  alt="GitHub"
                  width={22}
                  height={22}
                  className={`${styles.toggleDisplayInDarkMode} me-2`}
                />
                <Image
                  src="/githubLogo.png"
                  alt="GitHub"
                  width={22}
                  height={22}
                  className={`${styles.toggleDisplayInLightMode} me-2`}
                />
              </Link>
              <Button
                variant="dark"
                className="fw-semibold bg-black px-3 rounded-pill me-2"
                style={{ marginTop: '-7px' }}
              >
                Stake
              </Button>
              <span
                className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInLightMode}`}
                onClick={toggleTheme}
                style={{ marginTop: '-5px' }}
              >
                <FaToggleOff />
              </span>
              <span
                className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInDarkMode} ${styles.textColor}`}
                onClick={toggleTheme}
                style={{ marginTop: '-5px' }}
              >
                <FaToggleOn />
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Navbar */}
      <Navbar
        className="d-xl-none d-block px-3 pt-3"
        style={{ zIndex: '1000' }}
      >
        <Container fluid>
          <Link href="/">
            <Image
              src="/pythLogoLightMode.png"
              className={`${styles.toggleDisplayInLightMode}`}
              alt="Pyth Logo"
              width={83}
              height={17}
              priority
            />
            <Image
              src="/pythLogoDarkMode.png"
              className={`${styles.toggleDisplayInDarkMode}`}
              alt="Pyth Logo"
              width={83}
              height={17}
              priority
            />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="gap-2">
              <Link href="#" className="d-md-block d-none">
                <Image
                  src="/twitterLogoDarkMode.png"
                  alt="Twitter"
                  width={20}
                  height={18}
                  className={`${styles.toggleDisplayInDarkMode} me-2`}
                />
                <Image
                  src="/twitterLogoImage.png"
                  alt="Twitter"
                  width={20}
                  height={18}
                  className={`${styles.toggleDisplayInLightMode} me-2`}
                />
              </Link>
              <Link href="#" className="d-md-block d-none">
                <Image
                  src="/githubLogoDarkMode.png"
                  alt="GitHub"
                  width={22}
                  height={22}
                  className={`${styles.toggleDisplayInDarkMode} me-2`}
                />
                <Image
                  src="/githubLogo.png"
                  alt="GitHub"
                  width={22}
                  height={22}
                  className={`${styles.toggleDisplayInLightMode} me-2`}
                />
              </Link>
              <Button
                variant="dark"
                className="fw-semibold bg-black px-3 rounded-pill me-2"
                style={{ marginTop: '-7px' }}
              >
                Stake
              </Button>
              <IoMenuSharp className={`${styles.textColor} fs-4`} />
              <span
                className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInLightMode}`}
                onClick={toggleTheme}
                style={{ marginTop: '-5px' }}
              >
                <FaToggleOff />
              </span>
              <span
                className={`fs-5 px-xl-2 px-1 ${styles.toggleDisplayInDarkMode} ${styles.textColor}`}
                onClick={toggleTheme}
                style={{ marginTop: '-5px' }}
              >
                <FaToggleOn />
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
