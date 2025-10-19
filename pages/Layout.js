import Header from '@/components/Header'
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar'
import { Card, Row } from 'react-bootstrap'

export default function Layout({ children }) {
  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header />
      </div>
      <div className="containerWidthGlobalCSS h-100">
        <Card
          className="border-0 rounded-0 mt-1 p-0 m-0"
          style={{
            boxShadow: '-4px 0 6px -2px rgba(0, 0, 0, 0.08), 4px 0 6px -2px rgba(0, 0, 0, 0.08)',
            minHeight: '100vh',
          }}
        >
          <Card.Body className="px-2 py-0">
            <Row>
              <LeftSidebar insideLayout={true} />
              <div className="p-0 m-0" style={{ flex: 1, height: '100vh', overflow: 'hidden' }}>
                {children}
              </div>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
