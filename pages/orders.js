import styles from '@/components/Order/Orders.module.css'
import OrdersSection from '@/components/Order/OrdersSection'
import { useHoldings } from '@/contexts/HoldingsContext'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Col } from 'react-bootstrap'

export default function Orders() {
  const { orders } = useHoldings() // live updates from context

  return (
    <>
      <Head>
        <title>Orders | Exolane</title>
      </Head>
      <Col
        className={`px-4 py-3 rightSidebarScrollContainer ${styles.rightSidebarContainer} h-100`}
      >
        <div className={styles.rightColumn}>
          {orders.length === 0 ? (
            <div className="text-center mt-5">
              <Image src="/placeholderIcon.png" alt="#ImgNotFound" width={100} height={100} />
              <p className={styles.textColor}>You haven’t placed any order</p>
              <Link className="btn btn-primary" href="/" role="button">
                Get Started
              </Link>
            </div>
          ) : (
            <OrdersSection title="Executed Orders" data={orders} />
          )}
        </div>
      </Col>
    </>
  )
}
