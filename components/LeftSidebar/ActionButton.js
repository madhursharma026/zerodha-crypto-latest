import Link from 'next/link'
import { Button } from 'react-bootstrap'
import styles from './LeftSidebar.module.css'

export default function ActionButton({
  icon,
  variant = 'secondary',
  onClick,
  extraClass = '',
  linkAvailable,
  tokenSymbol,
}) {
  if (linkAvailable) {
    return (
      <Link href={`/trade/${tokenSymbol}`}>
        <Button variant={variant} className={`${styles.actionBtn} ${extraClass}`} onClick={onClick}>
          {icon}
        </Button>
      </Link>
    )
  }
  return (
    <Button variant={variant} className={`${styles.actionBtn} ${extraClass}`} onClick={onClick}>
      {icon}
    </Button>
  )
}
