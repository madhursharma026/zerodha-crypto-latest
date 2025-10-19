import { DndContext, closestCenter } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import TokenRow from './TokenRow'

export default function TokenList({ items, setItems, onBuy, onSell, onDelete }) {
  const [expandedItem, setExpandedItem] = useState(null)

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.name === active.id)
    const newIndex = items.findIndex((i) => i.name === over.id)
    setItems(arrayMove(items, oldIndex, newIndex))
  }

  const toggleExpand = (name) => {
    setExpandedItem((prev) => (prev === name ? null : name))
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items.map((i) => i.name)} strategy={verticalListSortingStrategy}>
        <ListGroup variant="flush" className="mediumFontSize">
          {items.map((item) => (
            <div key={item.name}>
              <TokenRow
                item={item}
                isProfit={parseFloat(item.change) > 0}
                onBuy={onBuy}
                onSell={onSell}
                onDelete={onDelete}
                onToggleExpand={() => toggleExpand(item.name)}
                isExpanded={expandedItem === item.name}
              />
              {expandedItem === item.name && <MarketDepthWidget />}
            </div>
          ))}
        </ListGroup>
      </SortableContext>
    </DndContext>
  )
}

function MarketDepthWidget() {
  const bids = [
    { price: '1359.10', orders: '4', qty: '1288' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
  ]

  const offers = [
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
    { price: '0.00', orders: '0', qty: '0' },
  ]

  const infoRow = (leftLabel, leftValue, rightLabel, rightValue) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
        whiteSpace: 'nowrap',
        gap: '24px', // spacing between left-right pairs
      }}
    >
      {/* Left Pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', minWidth: '45%' }}>
        <span style={{ textAlign: 'left' }}>{leftLabel}</span>
        <span style={{ textAlign: 'right' }}>{leftValue}</span>
      </div>

      {/* Right Pair */}
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', minWidth: '45%' }}>
        <span style={{ textAlign: 'left' }}>{rightLabel}</span>
        <span style={{ textAlign: 'right' }}>{rightValue}</span>
      </div>
    </div>
  )

  return (
    <div
      style={{
        color: 'var(--text-color)',
        fontSize: '12px',
        padding: '12px 14px',
        border: '1px solid var(--border-color)',
        maxWidth: '450px',
        lineHeight: 1.4,
      }}
    >
      {/* Header */}
      <div className="fw-semibold" style={{ display: 'flex', marginBottom: '4px' }}>
        <div style={{ width: '16%' }}>Bid</div>
        <div style={{ width: '16%', textAlign: 'center' }}>Orders</div>
        <div style={{ width: '16%', textAlign: 'right' }}>Qty.</div>
        <div style={{ width: '3%' }}></div>
        <div style={{ width: '16%' }}>Offer</div>
        <div style={{ width: '16%', textAlign: 'center' }}>Orders</div>
        <div style={{ width: '16%', textAlign: 'right' }}>Qty.</div>
      </div>

      {/* Bids & Offers */}
      {bids.map((bid, i) => (
        <div key={i} style={{ display: 'flex', marginBottom: '2px' }}>
          <div style={{ width: '16%', color: '#3d7fff' }}>{bid.price}</div>
          <div style={{ width: '16%', textAlign: 'center' }}>{bid.orders}</div>
          <div style={{ width: '16%', textAlign: 'right' }}>{bid.qty}</div>
          <div style={{ width: '3%' }}></div>
          <div style={{ width: '16%', color: '#f44336' }}>{offers[i].price}</div>
          <div style={{ width: '16%', textAlign: 'center' }}>{offers[i].orders}</div>
          <div style={{ width: '16%', textAlign: 'right' }}>{offers[i].qty}</div>
        </div>
      ))}

      {/* Info Section */}
      <div
        className="p-3 my-3"
        style={{
          background: 'var(--background-color)',
          borderRadius: '4px',
          padding: '10px',
        }}
      >
        {infoRow('Open', '1,325.10', 'Prev. Close', '1,333.10')}
        {infoRow('Low', '1,325.10', 'High', '1,363.70')}

        <div
          style={{
            height: '4px',
            backgroundColor: '#444',
            borderRadius: '2px',
            marginTop: '10px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '65%',
              height: '100%',
              backgroundColor: 'green',
              borderRadius: '2px',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      </div>

      {/* Bottom Info */}
      {infoRow('Volume', '8,35,083', 'Avg. price', '1,351.41')}
      {infoRow('Lower circuit', '1,223.20', 'Upper circuit', '1,495.00')}
      {infoRow('LTQ', '52', 'LTT', '2025-10-16 15:56:29')}
    </div>
  )
}
