import TokenRow from './TokenRow'

export default function SearchResults({ filteredItems, onBuy, onSell, onAdd, items }) {
  if (!filteredItems.length) return null

  return (
    <div>
      {filteredItems.map((token) => (
        <TokenRow
          key={token.name}
          item={token}
          isProfit={parseFloat(token.change) > 0}
          onBuy={() => onBuy(token)}
          onSell={() => onSell(token)}
          onDelete={null}
          sortable={false}
          onAdd={() => onAdd(token.name)}
          isSearch={true}
          items={items} // pass main list for tick logic
        />
      ))}
    </div>
  )
}
