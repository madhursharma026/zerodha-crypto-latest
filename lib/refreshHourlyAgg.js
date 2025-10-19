// zerodha-crypto\lib\refreshHourlyAgg.js

import pool from './db'

export async function refreshHourlyAgg() {
  try {
    await pool.query('REFRESH MATERIALIZED VIEW binance_hourly_agg;')
    console.log('✅ Materialized view refreshed successfully at', new Date().toISOString())
  } catch (err) {
    console.error('❌ Failed to refresh materialized view:', err)
  }
}
