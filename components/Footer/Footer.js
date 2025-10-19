import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa'
import { FaDesktop, FaMoon, FaSun, FaXTwitter } from 'react-icons/fa6'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <div className={styles.disclaimer}>
        <Container
          fluid
          className={`pt-5 mediumFontSize ${styles.containerSize}`}
        >
          <h6 className="fw-semibold">Disclaimer</h6>
          <p>
            Pyth Price Feeds are provided on an <code>AS IS</code>,{' '}
            <code>WITH ALL FAULTS</code>, and <code>AS AVAILABLE</code> basis,
            without any warranties or representations of any kind. Please read
            the following important disclaimer before using them. Read
            disclaimer
          </p>

          <h6 className="fw-semibold mt-5">Trademark Disclaimer</h6>
          <p>
            This website may display ticker symbols, product names, and other
            identifiers that are trademarks...
            {/* You can keep the rest of the text here */}
          </p>
        </Container>
      </div>
      <hr className={styles.hrColor} />
      <footer className={styles.footer}>
        <Container
          fluid
          style={{
            maxWidth: '1300px',
            margin: 'auto',
          }}
        >
          <Row className="mb-5 align-items-center">
            <Col lg={6}>
              <h6>
                <Image
                  src="/feedsFooterLogo.png"
                  alt="#ImgNotFound"
                  width={20}
                  height={25}
                  className={`${styles.toggleDisplayInLightMode} me-2`}
                />
                <Image
                  src="/feedsFooterLogoDarkMode2.png"
                  alt="#ImgNotFound"
                  width={20}
                  height={25}
                  className={`${styles.toggleDisplayInDarkMode} me-2`}
                />
                The Price of Everything
              </h6>
            </Col>
            <Col lg={6} className="text-lg-end">
              <div className={styles.socialIcons}>
                <FaXTwitter className="me-3 fs-5" />
                <FaDiscord className="me-3 fs-5" />
                <FaTelegram className="me-3 fs-5" />
                <FaYoutube className="me-3 fs-5" />
                <FaGithub className="me-3 fs-5" />
                <FaLinkedin className="me-3 fs-5" />
                <FaInstagram className="me-3 fs-5" />
                <FaReddit className="me-3 fs-5" />
                <FaTwitch className="me-3 fs-5" />
              </div>
            </Col>
          </Row>

          <Row>
            {[
              { title: 'Products', links: ['Price Feeds', 'Entropy'] },
              {
                title: 'Partners',
                links: ['Publishers', 'Applications', 'Success stories'],
              },
              {
                title: 'Ecosystem',
                links: ['Insights Hub ↗', 'Staking ↗', 'Network KPIs ↗'],
              },
              {
                title: 'Developers',
                links: ['Documentation ↗', 'API Reference ↗', 'Tutorials ↗'],
              },
              {
                title: 'Community',
                links: ['Community Hub', 'Events', 'DAO Forum ↗'],
              },
              { title: 'Resources', links: ['Blog', 'Newsroom', 'Legal'] },
            ].map((col, i) => (
              <Col key={i} lg={2} md={4} xs={6}>
                <h6>{col.title}</h6>
                <ul>
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href="#" className={styles.footerLinks}>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>

          <div className="mt-5 d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div className="mb-3 mb-lg-0">
              <FaDesktop className="me-3" />
              <FaSun className="me-3" />
              <FaMoon className="me-3" />
            </div>
            <p className="mb-0 text-center text-lg-start">
              © 2025 Pyth Data Association
            </p>
            <div className="mt-3 mt-lg-0 text-center text-lg-end">
              {['Privacy Policy', 'Terms of Use', 'Trademark Disclaimer'].map(
                (text, i) => (
                  <Link
                    key={i}
                    href="#"
                    className={`me-3 ${styles.footerLinks}`}
                  >
                    {text}
                  </Link>
                )
              )}
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
