<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useMetaMaskWallet } from "vue-connect-wallet"

const wallet = useMetaMaskWallet()
const address = ref('')
const connectError = ref('')

onMounted(() => {
  const localStorageWalletAddress = localStorage.getItem('walletAddress')
  if (localStorageWalletAddress) {
    address.value = localStorageWalletAddress
  }
})

watchEffect(() => {
  address.value = localStorage.getItem('walletAddress') || ''
})

wallet.onAccountsChanged((accounts: string[]) => {
  if (accounts[0] && accounts[0] !== 'E') {
    localStorage.setItem('walletAddress', accounts[0])
    address.value = localStorage.getItem('walletAddress') || ''
  } else {
    localStorage.removeItem('walletAddress')
    address.value = ''
  }
});

const connect = async () => {
  const accounts = await wallet.connect();
  try {
    if (typeof accounts === "string") {
      console.error("An error occurred" + accounts)
      connectError.value = accounts
    }
  } catch {
    if (accounts[0] && accounts[0] !== 'E') {
      localStorage.setItem('walletAddress', accounts[0])
    }
  }
};
</script>

<template>
  <div class="wallet-info">
    <button
      type="button"
      @click="connect"
      class="wallet-info__btn"
    >Connect MetaMask</button>
    <h2 v-if="connectError" class="wallet-info__error">
      {{ connectError }}
    </h2>
    <div class="wallet-info__address" v-if="address">
      <h1>
        Wallet address
      </h1>
      <h2>{{ address }}</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wallet-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__btn {
    width: 280px;
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    margin-bottom: 25px;

    outline: none;

    background: #fff;
    color: #383b3a;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 3px #ccc;
    transition: transform 100ms;

    &:hover {
      transform: translateY(1px);
      box-shadow: 0 2px #ccc;
    }
  }

  &__address {
    text-align: center;
  }

  &__error {
    color: red;
  }
}
</style>
