import { useHoldings } from '@/contexts/HoldingsContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { AiTwotoneThunderbolt } from 'react-icons/ai'
import { BsTextParagraph } from 'react-icons/bs'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { GoCheck, GoPlus } from 'react-icons/go'
import { GrNotes } from 'react-icons/gr'
import { HiOutlinePaperClip } from 'react-icons/hi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoCartOutline, IoOptionsOutline } from 'react-icons/io5'
import {
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSegment,
  MdOutlineShowChart,
} from 'react-icons/md'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { RxDotsHorizontal, RxDragHandleDots2 } from 'react-icons/rx'
import { SiSpeedypage } from 'react-icons/si'
import { VscGraphLine } from 'react-icons/vsc'
import ActionButton from './ActionButton'
import styles from './LeftSidebar.module.css'

export default function TokenRow({
  item,
  isProfit,
  onBuy,
  onSell,
  onDelete,
  onAdd,
  onToggleExpand,
  isExpanded,
  sortable = true,
  isSearch = false,
  items,
}) {
  const { holdings } = useHoldings()
  const [isHovered, setIsHovered] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.name,
  })
  const style = sortable ? { transform: CSS.Transform.toString(transform), transition } : {}
  const holding = holdings.find((h) => h.name === item.name)
  const holdingQty = holding ? holding.qty : 0
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mediumFontSize ${styles.tokenRow} ${
        isSearch ? styles.searchRow : styles.mainRow
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setOpen(false)
      }}
    >
      <Col xs={3} className={styles.tokenName}>
        {sortable && (
          <span className={styles.dragHandle} {...listeners} {...attributes}>
            <RxDragHandleDots2 size={16} />
          </span>
        )}
        <span className={!sortable ? 'ps-2' : 'ps-0'}>{item.name}</span>
      </Col>

      <Col xs={9} className={`${styles.tokenValues} pb-1`}>
        <div className={styles.values}>
          {holdingQty > 0 && (
            <span className={`${styles.value} ${styles.change}`}>
              {holdingQty} <RiLuggageDepositLine />
            </span>
          )}
          <span
            className={`${styles.value} ${styles.change} ${holdingQty > 0 ? 'd-none' : 'd-block'}`}
          >
            {isProfit ? `+${item.change}` : item.change}
          </span>
          <span className={`${styles.value} ${isProfit ? styles.up : styles.down}`}>
            {Math.abs(item.percent)}% {isProfit ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </span>
          <span className={`${styles.value} ${isProfit ? styles.up : styles.down}`}>
            {item.price === 'Loading...' ? <div className={styles.skeleton}></div> : item.price}
          </span>
        </div>

        {isHovered && (
          <div className={styles.actions}>
            {!isSearch && (
              <>
                <ActionButton
                  icon="B"
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onBuy(item)
                  }}
                />
                <ActionButton
                  icon="S"
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSell(item)
                  }}
                />
                <ActionButton
                  icon={<BsTextParagraph />}
                  extraClass={styles.actionBtnBg}
                  linkAvailable={false}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleExpand()
                  }}
                />

                <ActionButton
                  icon={<VscGraphLine />}
                  extraClass={styles.actionBtnBg}
                  linkAvailable
                  tokenSymbol={item.name.toUpperCase()}
                />
                {onDelete && (
                  <ActionButton
                    icon={<MdDeleteOutline />}
                    extraClass={styles.actionBtnBg}
                    onClick={() => onDelete(item.name)}
                  />
                )}
                {onAdd && (
                  <ActionButton
                    icon={<GoPlus />}
                    extraClass={styles.actionBtnBg}
                    onClick={(e) => {
                      e.stopPropagation()
                      onAdd(item.name)
                    }}
                  />
                )}

                <div className={styles.actionDropdown} ref={btnRef}>
                  <Button
                    variant="secondary"
                    className={`${styles.actionBtn} ${styles.actionBtnBg}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpen(!open)
                    }}
                  >
                    <RxDotsHorizontal />
                  </Button>
                  {open && (
                    <div className={styles.dropdownMenuCustom}>
                      <div className={styles.menuItem}>
                        <HiOutlinePaperClip /> Pin
                      </div>
                      <div className={styles.menuItem}>
                        <GrNotes /> Notes
                      </div>
                      <div className={styles.menuItem}>
                        <MdOutlineShowChart /> Charts
                      </div>
                      <div className={styles.menuItem}>
                        <IoOptionsOutline /> Option chain
                      </div>
                      <div className={styles.menuItem}>
                        <SiSpeedypage /> Create GTT / GTC
                      </div>
                      <div className={styles.menuItem}>
                        <IoIosNotificationsOutline /> Create alert
                      </div>
                      <div className={styles.menuItem}>
                        <MdOutlineSegment /> Market depth
                      </div>
                      <div className={styles.menuItem}>
                        <IoCartOutline /> Add to basket
                      </div>
                      <div className={styles.menuItem}>
                        <FaLongArrowAltUp /> Fundamentals
                      </div>
                      <div className={styles.menuItem}>
                        <AiTwotoneThunderbolt /> Technicals
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {isSearch && (
              <>
                <ActionButton
                  icon={<BsTextParagraph />}
                  extraClass={styles.actionBtnBg}
                  linkAvailable={false}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleExpand()
                  }}
                />

                <ActionButton
                  icon={<VscGraphLine />}
                  extraClass={styles.actionBtnBg}
                  linkAvailable
                  tokenSymbol={item.name.toUpperCase()}
                />
                {onAdd && (
                  <ActionButton
                    icon={items?.some((i) => i.name === item.name) ? <GoCheck /> : <GoPlus />}
                    {...(items?.some((i) => i.name === item.name)
                      ? { extraClass: styles.actionBtnBg }
                      : { variant: 'success' })}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!items?.some((i) => i.name === item.name)) onAdd(item.name)
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </Col>
    </div>
  )
}
