// zerodha-crypto/pages/api/binance/[symbol].js
import { hasura } from '@/lib/hasuraClient'

export default async function handler(req, res) {
  const symbol = req.query?.symbol?.toUpperCase() || 'BTCUSDT'
  const interval = req.query?.interval || '1d'
  const limit = parseInt(req.query?.limit || '50', 10)

  try {
    // 1️⃣ Fetch Binance data
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    )
    const data = await response.json()

    if (!Array.isArray(data)) return res.status(500).json({ error: 'Invalid Binance response' })

    // 2️⃣ Upsert into Hasura
    const rows = data.map((kline) => {
      const [
        open_time,
        open,
        high,
        low,
        close,
        volume,
        close_time,
        quote_asset_volume,
        number_of_trades,
        taker_buy_base_asset_volume,
        taker_buy_quote_asset_volume,
      ] = kline

      return {
        symbol,
        interval,
        open_time: new Date(Number(open_time)).toISOString(),
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        volume: parseFloat(volume),
        close_time: close_time ? new Date(Number(close_time)).toISOString() : null,
        quote_asset_volume: parseFloat(quote_asset_volume),
        number_of_trades,
        taker_buy_base_asset_volume: parseFloat(taker_buy_base_asset_volume),
        taker_buy_quote_asset_volume: parseFloat(taker_buy_quote_asset_volume),
      }
    })

    const mutation = `
      mutation UpsertKlines($objects: [binance_klines_insert_input!]!) {
        insert_binance_klines(
          objects: $objects,
          on_conflict: {
            constraint: binance_klines_pkey,
            update_columns: [open, high, low, close, volume, close_time, quote_asset_volume, number_of_trades, taker_buy_base_asset_volume, taker_buy_quote_asset_volume]
          }
        ) {
          affected_rows
        }
      }
    `
    await hasura.request(mutation, { objects: rows })

    // 3️⃣ Fetch latest for chart
    const query = `
      query GetKlines($symbol: String!, $interval: String!, $limit: Int!) {
        binance_klines(
          where: {symbol: {_eq: $symbol}, interval: {_eq: $interval}},
          order_by: {open_time: asc},
          limit: $limit
        ) {
          open_time
          open
          high
          low
          close
          volume
        }
      }
    `
    const result = await hasura.request(query, { symbol, interval, limit })
    const formatted = result.binance_klines.map((k) => ({
      time: Math.floor(new Date(k.open_time).getTime() / 1000),
      open: parseFloat(k.open),
      high: parseFloat(k.high),
      low: parseFloat(k.low),
      close: parseFloat(k.close),
      volume: parseFloat(k.volume),
    }))

    res.status(200).json(formatted)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
