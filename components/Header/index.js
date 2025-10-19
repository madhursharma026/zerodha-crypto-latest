import useCryptoPrice from '@/hooks/useCryptoPrice'
import useTheme from '@/hooks/useTheme'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'
import OffcanvasMenu from './OffcanvasMenu'

const menuItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/orders', label: 'Orders' },
  { href: '/holdings', label: 'Holdings' },
  { href: '/earn', label: 'Earn' },
  { href: '/funds', label: 'Funds' },
]

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { btcPrice, ethPrice } = useCryptoPrice()
  const pathname = usePathname()
  const params = useParams() // gives { symbol: "BTC" } on /trade/BTC
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <DesktopHeader
        btcPrice={btcPrice}
        ethPrice={ethPrice}
        menuItems={menuItems}
        pathname={pathname}
        toggleTheme={toggleTheme}
      />
      <MobileHeader
        pathname={pathname}
        symbol={params?.symbol}
        toggleTheme={toggleTheme}
        handleShow={handleShow}
      />
      <OffcanvasMenu
        show={show}
        handleClose={handleClose}
        menuItems={menuItems}
        pathname={pathname}
        toggleTheme={toggleTheme}
      />
    </>
  )
}

export default Header
