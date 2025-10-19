export default function PositionRow({ item }) {
  return (
    <tr className="mediumFontSize">
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <span className="px-2 py-1 badge bg-light text-dark">
          {item.Product}
        </span>
      </td>
      <td>{item.Instrument}</td>
      <td>{item.Qty}</td>
      <td>{item.Avg}</td>
      <td>{item.LTP}</td>
      <td>{item.pnl}</td>
      <td>{item.Chg}</td>
    </tr>
  )
}
