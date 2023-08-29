<script setup lang="ts">
import { ref } from 'vue'
import { SWAPS_QUERY } from './queries/swaps'
import { useQuery } from '@vue/apollo-composable'
import DataTable from './components/DataTable.vue'
import WalletButton from './components/WalletButton.vue'

const COLUMNS = [
  {
    label: 'sender',
    field: 'caller',
  },
  {
    label: 'receiver',
    field: 'poolIdAddress',
  },
  {
    label: 'amount',
    field: 'tokenAmountOut',
  },
  {
    label: 'timestamp',
    field: 'timestamp',
  },
]

interface ISwap {
  tokenAmountOut: string
  timestamp: string
  caller: string
  poolId: {
    [address: string]: string
  }
}

const { onResult, loading, error } = useQuery(SWAPS_QUERY)
const rows = ref<ISwap[]>([])

onResult(({ data }) => {
  rows.value = data?.swaps.map(({
    tokenAmountOut,
    timestamp,
    caller,
    poolId,
  }: ISwap) => {

    return {
      tokenAmountOut,
      timestamp,
      caller,
      poolIdAddress: poolId.address,
    }
  })
})
</script>

<template>
  <div class="top">
    <WalletButton />
  </div>
  <h1 v-if="error">{{ error }}</h1>
  <DataTable
    v-else
    is-hide-paging
    :is-loading="loading"
    :columns="COLUMNS"
    :rows="rows"
  />
</template>

<style scoped>
.top {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
</style>
