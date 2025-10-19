// zerodha-crypto\pages\api\crypto_market_data.js

import pool from '@/lib/db'

export default async function handler(req, res) {
  const { token = 'bitcoin', days = '365' } = req.query
  try {
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=${days}`
    )
    if (!cgRes.ok) return res.status(cgRes.status).json({ error: 'CoinGecko fetch failed' })

    const data = await cgRes.json()

    const insertPromises = data.prices.map(([timestamp, price], index) => {
      const market_cap = data.market_caps?.[index]?.[1] || null
      const total_volume = data.total_volumes?.[index]?.[1] || null
      const date = new Date(timestamp)

      const query = `
        INSERT INTO crypto_market_data (token_id, date, price_usd, market_cap_usd, total_volume_usd)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (token_id, date)
        DO UPDATE SET
          price_usd = EXCLUDED.price_usd,
          market_cap_usd = EXCLUDED.market_cap_usd,
          total_volume_usd = EXCLUDED.total_volume_usd
      `
      const values = [token, date, price, market_cap, total_volume]
      return pool.query(query, values)
    })

    await Promise.all(insertPromises)

    res.status(200).json({ token, days, data })
  } catch (error) {
    console.error('❌ Error fetching/inserting market chart data:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
