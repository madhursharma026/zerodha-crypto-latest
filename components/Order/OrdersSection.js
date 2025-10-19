import OrdersCard from './OrdersCard'
import OrdersTable from './OrdersTable'

export default function OrdersSection({ title, data }) {
  return (
    <>
      <p className="fs-5">
        {title} ({data.length})
      </p>
      <OrdersTable data={data} />
      <OrdersCard data={data} />
    </>
  )
}
