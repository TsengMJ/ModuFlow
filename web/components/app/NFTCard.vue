<script lang="ts" setup>
import { avalancheFuji } from 'viem/chains'
import type { Address } from '@/types'

const props = defineProps<{
  image: string
  name: string
  contract: Address
}>()

const message = useMessage()

const { address } = useAccount()
const smartManagerConfig = useSmartManagerConfig()

const { data: tokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [props.contract],
  enabled: computed(() => !!address.value),
})

const { data: isAccessible, refetch } = useContractRead({
  ...smartManagerConfig,
  functionName: 'isAccessible',
  args: [address as Ref<Address>, tokenId as Ref<bigint>],
  enabled: computed(() => !!address.value && !tokenId.value),
})

const config = useReNFTConfig()

const { isLoading, writeAsync, wait } = useContractWrite({
  ...config,
  functionName: 'mint',
  args: [props.contract, address as Ref<Address>, 1n],
})

async function onMintHandler() {
  try {
    await writeAsync()
    await wait()
    refetch()
    message.success('Success')
  }
  catch (error: any) {
    message.error(error.details || error.message)
  }
}

const { address: accessCollectionSmartNFTAddress } = useAccessCollectionSmartNFTAddress()
const { showHandler: showAssetCollectionNFTDialog } = useModal({ name: 'asset-collection-nft' })
const { showHandler: showRevolvingLendingNFTDialog } = useModal({ name: 'revolving-lending-nft' })

function onRunHandler() {
  if (props.contract === accessCollectionSmartNFTAddress)
    showAssetCollectionNFTDialog()
  else
    showRevolvingLendingNFTDialog()
}
</script>

<template>
  <div class="card">
    <img :src="image" class="nft-image">
    <div class="info">
      <span class="name">{{ name }}</span>
      <nuxt-link :href="`${avalancheFuji.blockExplorers.default.url}/address/${contract}`" target="_blank" class="address">
        {{ formatAddress(contract) }}
      </nuxt-link>
    </div>

    <n-button v-if="isAccessible" @click="onRunHandler">
      Run
    </n-button>
    <n-button v-else :loading="isLoading" @click="onMintHandler">
      Mint
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  background: #101010;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 20px;
  gap: 20px;

  .nft-image {
    width: 200px;
    height: 200px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .name {
      line-height: 20px;
    }

    .address {
      font-size: 12px;
      line-height: 20px;
      text-decoration: underline;
      opacity: .6;
    }
  }
}
</style>
