import { HoldingsProvider } from '@/contexts/HoldingsContext'
import { PriceProvider } from '@/contexts/PriceContext'
import { PrivacyProvider } from '@/contexts/PrivacyContext'
import { ToastProvider } from '@/contexts/ToastContext'
import '@/styles/globals.css'
import '@/styles/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './Layout'

export default function App({ Component, pageProps }) {
  return (
    <PriceProvider>
      <ToastProvider>
        <HoldingsProvider>
          <PrivacyProvider>
            {Component.getLayout ? (
              Component.getLayout(<Component {...pageProps} />)
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </PrivacyProvider>
        </HoldingsProvider>
      </ToastProvider>
    </PriceProvider>
  )
}
