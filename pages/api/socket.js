// zerodha-crypto\pages\api\socket.js

import { TOKENS } from '@/utils/tokenMap'
import { Server } from 'socket.io'

let io

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    })

    res.socket.server.io = io

    io.on('connection', (socket) => {
      Object.entries(TOKENS).forEach(([key, token]) => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${token.SYMBOL}@trade`)

        ws.onmessage = (msg) => {
          const data = JSON.parse(msg.data)
          socket.emit('price-update', {
            id: token.CODE,
            price: parseFloat(data.p),
          })
        }

        ws.onclose = () => {
          console.log(`Binance WS closed for ${token.SYMBOL}`)
        }
      })
    })
  }

  res.end()
}
