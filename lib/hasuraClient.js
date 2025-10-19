// zerodha-crypto/lib/hasuraClient.js

import { GraphQLClient } from 'graphql-request'

export const hasura = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_URL, {
  headers: {
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
})
