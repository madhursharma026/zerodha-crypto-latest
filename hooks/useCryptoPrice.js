import { usePrices } from '@/contexts/PriceContext'

const useCryptoPrice = () => {
  const { data, loading } = usePrices()

  const btc = data.find((item) => item.name === 'BTC') || {
    price: 'Loading...',
    change: '0.00',
    percent: '0.00',
  }
  const eth = data.find((item) => item.name === 'ETH') || {
    price: 'Loading...',
    change: '0.00',
    percent: '0.00',
  }

  return {
    btcPrice: btc.price,
    btcChange: btc.change,
    btcPercent: btc.percent,
    ethPrice: eth.price,
    ethChange: eth.change,
    ethPercent: eth.percent,
    loading,
  }
}

export default useCryptoPrice
