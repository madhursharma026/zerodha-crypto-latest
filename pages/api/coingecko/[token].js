// zerodha-crypto\pages\api\coingecko\[token].js

import { hasura } from '@/lib/hasuraClient'

export default async function handler(req, res) {
  const { token } = req.query
  if (!token) return res.status(400).json({ error: 'Token required' })

  try {
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${token.toLowerCase()}?localization=false&tickers=false&market_data=true`
    )
    const data = await cgRes.json()
    const md = data.market_data || {}

    // Prepare variables for Hasura upsert
    const variables = {
      token_id: data.id,
      symbol: data.symbol?.toUpperCase() || null,
      name: data.name || null,
      description: data.description?.en?.slice(0, 1000) || null,
      image_url: data.image?.large || null,
      homepage_url: data.links?.homepage?.[0] || null,
      github_url: data.links?.repos_url?.github?.[0] || null,
      explorer_url: data.links?.blockchain_site?.[0] || null,
      current_price_usd: md.current_price?.usd || 0,
      market_cap_usd: md.market_cap?.usd || 0,
      total_volume_usd: md.total_volume?.usd || 0,
      market_cap_rank: data.market_cap_rank || null,
      circulating_supply: md.circulating_supply || 0,
      total_supply: md.total_supply || 0,
      max_supply: md.max_supply || 0,
      price_change_percentage_7d: md.price_change_percentage_7d_in_currency?.usd || 0,
      market_cap_change_percentage_24h: md.market_cap_change_percentage_24h || 0,
      ath_usd: md.ath?.usd || 0,
      ath_change_percentage: md.ath_change_percentage?.usd || 0,
      ath_date_usd: md.ath_date?.usd || null,
      atl_usd: md.atl?.usd || 0,
      atl_change_percentage: md.atl_change_percentage?.usd || 0,
      atl_date_usd: md.atl_date?.usd || null,
      last_updated: data.last_updated
        ? new Date(data.last_updated).toISOString()
        : new Date().toISOString(),
    }

    const mutation = `
      mutation UpsertToken($token_id: String!, $symbol: String, $name: String, $description: String, $image_url: String, $homepage_url: String, $github_url: String, $explorer_url: String, $current_price_usd: numeric, $market_cap_usd: numeric, $total_volume_usd: numeric, $market_cap_rank: Int, $circulating_supply: numeric, $total_supply: numeric, $max_supply: numeric, $price_change_percentage_7d: numeric, $market_cap_change_percentage_24h: numeric, $ath_usd: numeric, $ath_change_percentage: numeric, $ath_date_usd: timestamptz, $atl_usd: numeric, $atl_change_percentage: numeric, $atl_date_usd: timestamptz, $last_updated: timestamptz) {
        insert_coingecko_tokens(
          objects: [{
            token_id: $token_id,
            symbol: $symbol,
            name: $name,
            description: $description,
            image_url: $image_url,
            homepage_url: $homepage_url,
            github_url: $github_url,
            explorer_url: $explorer_url,
            current_price_usd: $current_price_usd,
            market_cap_usd: $market_cap_usd,
            total_volume_usd: $total_volume_usd,
            market_cap_rank: $market_cap_rank,
            circulating_supply: $circulating_supply,
            total_supply: $total_supply,
            max_supply: $max_supply,
            price_change_percentage_7d: $price_change_percentage_7d,
            market_cap_change_percentage_24h: $market_cap_change_percentage_24h,
            ath_usd: $ath_usd,
            ath_change_percentage: $ath_change_percentage,
            ath_date_usd: $ath_date_usd,
            atl_usd: $atl_usd,
            atl_change_percentage: $atl_change_percentage,
            atl_date_usd: $atl_date_usd,
            last_updated: $last_updated
          }],
          on_conflict: {
            constraint: coingecko_tokens_pkey,
            update_columns: [current_price_usd, market_cap_usd, total_volume_usd, market_cap_rank, circulating_supply, total_supply, max_supply, price_change_percentage_7d, market_cap_change_percentage_24h, ath_usd, ath_change_percentage, ath_date_usd, atl_usd, atl_change_percentage, atl_date_usd, last_updated]
          }
        ) {
          returning { token_id symbol name current_price_usd market_cap_usd total_volume_usd circulating_supply total_supply max_supply }
        }
      }
    `

    const result = await hasura.request(mutation, variables)

    // Include full market_data for frontend TokenInfo component
    res.status(200).json({
      ...data,
      market_data: {
        current_price: { usd: variables.current_price_usd },
        market_cap: { usd: variables.market_cap_usd },
        total_volume: { usd: variables.total_volume_usd },
        market_cap_rank: variables.market_cap_rank,
        circulating_supply: variables.circulating_supply,
        total_supply: variables.total_supply,
        max_supply: variables.max_supply,
        price_change_percentage_7d_in_currency: { usd: variables.price_change_percentage_7d },
        market_cap_change_percentage_24h: variables.market_cap_change_percentage_24h,
        ath: { usd: variables.ath_usd },
        ath_change_percentage: { usd: variables.ath_change_percentage },
        ath_date: { usd: variables.ath_date_usd },
        atl: { usd: variables.atl_usd },
        atl_change_percentage: { usd: variables.atl_change_percentage },
        atl_date: { usd: variables.atl_date_usd },
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
