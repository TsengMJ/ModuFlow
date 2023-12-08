<script lang="ts" setup>
import type { Address } from '@/types'

const { showHandler } = useModal({ name: 'connect-wallet' })
const chainId = useLastChainId()
const { isConnected, address } = useAccount()
const { data: ensName } = useEnsName({
  address,
  chainId,
  enabled: !!unref(address),
})
</script>

<template>
  <n-button @click="showHandler">
    <span v-if="isConnected">{{ ensName ? formatENS(ensName) : formatAddress(address as Address) }}</span>
    <span v-else>Connect Wallet</span>
  </n-button>
</template>
