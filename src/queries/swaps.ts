import gql from 'graphql-tag'

const SWAPS_QUERY = gql` 
  query Swaps {
    swaps(first: 5) {
      tokenAmountOut
      timestamp
      caller
      poolId {
        address
      }
    }
  }
`

export { SWAPS_QUERY }
