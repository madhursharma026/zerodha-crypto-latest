import { usePrices } from '@/contexts/PriceContext'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import BuySellCard from '../BuySellCard/BuySellCard'
import styles from './LeftSidebar.module.css'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import TokenList from './TokenList'

export default function LeftSidebar({ insideLayout }) {
  const { data } = usePrices()
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)
  const [popupData, setPopupData] = useState(null)
  const [popupType, setPopupType] = useState(null)
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('priceListOrder') || '[]')
    if (saved.length > 0) {
      setItems(saved.map((id) => data.find((token) => token.name === id)).filter(Boolean))
    }
  }, [data])

  const saveItems = useCallback((list) => {
    setItems(list)
    localStorage.setItem('priceListOrder', JSON.stringify(list.map((i) => i.name)))
  }, [])

  const handleAddToken = (name) => {
    const token = data.find((t) => t.name.toLowerCase() === name.toLowerCase())
    if (token && !items.some((i) => i.name === token.name)) saveItems([...items, token])
  }

  const handleDeleteToken = (name) => saveItems(items.filter((i) => i.name !== name))

  // ✅ Show all search results even if token is already added
  const filteredItems = useMemo(() => {
    return data.filter((item) =>
      !search.trim() ? true : item.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFocused(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddButtonClick = () => {
    setFocused(true)
    setSearch('')
    const input = wrapperRef.current?.querySelector('input')
    input?.focus()
  }

  return (
    <Col className={`${styles.leftColumn} ${styles.leftColumnDisplay} pt-3 px-3`}>
      <div ref={wrapperRef}>
        <SearchBar ref={inputRef} search={search} setSearch={setSearch} setFocused={setFocused} />

        {focused && filteredItems.length > 0 && (
          <div
            className={styles.searchResultsContainer}
            style={{
              maxHeight: `calc(100vh - ${insideLayout ? 120 : 208}px)`,
            }}
          >
            <SearchResults
              filteredItems={filteredItems}
              onBuy={(coin) => {
                setPopupData(coin)
                setPopupType('buy')
                setFocused(false)
                setSearch('')
              }}
              onSell={(coin) => {
                setPopupData(coin)
                setPopupType('sell')
                setFocused(false)
                setSearch('')
              }}
              onAdd={handleAddToken}
              items={items}
            />
          </div>
        )}
      </div>

      <div className={`${styles.scrollContainer} h-100`}>
        <div className={`${styles.headerRow} fw-bold smallFontSize px-3 py-2`}>
          <span>Your Tokens ({items.length})</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center p-2 mt-5">
            <Image
              src="/tokenPlaceholderIcon.png"
              alt="#ImgNotFound"
              width={50}
              height={50}
              className="mb-3"
            />
            <p>You don&#39;t have any tokens in your watchlist.</p>
            <Button variant="primary" onClick={handleAddButtonClick}>
              Add a token
            </Button>
          </div>
        ) : (
          <TokenList
            items={items}
            setItems={saveItems}
            onBuy={(coin) => {
              setPopupData(coin)
              setPopupType('buy')
            }}
            onSell={(coin) => {
              setPopupData(coin)
              setPopupType('sell')
            }}
            onDelete={handleDeleteToken}
            loading={data.some((t) => t.price === 'Loading...')}
          />
        )}
      </div>

      {popupData && (
        <BuySellCard
          type={popupType}
          item={data.find((t) => t.name === popupData?.name)}
          onClose={() => setPopupData(null)}
        />
      )}
    </Col>
  )
}
