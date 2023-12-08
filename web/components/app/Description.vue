<script lang="ts" setup>
import type { Address } from '@/types'
import AssetCollectionImage from '@/assets/images/app/asset-collection.png'
import RevolvingLendingImage from '@/assets/images/app/revolving-lending.png'

const { showHandler: showCombinationRunHandler } = useModal({ name: 'combination-run' })

const { address: accessCollectionSmartNFTAddress } = useAccessCollectionSmartNFTAddress()
const { address: revolvingLendingSmartNFTAddress } = useRevolvingLendingSmartNFTAddress()

const message = useMessage()
const { address } = useAccount()
const smartManagerConfig = useSmartManagerConfig()

const { data: accessCollectionAccessibleTokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [accessCollectionSmartNFTAddress],
  enabled: computed(() => !!address.value),
})

const { data: isAccessCollectionAccessible, refetch: accessCollectionSmartNFTRefetch } = useContractRead({
  ...smartManagerConfig,
  functionName: 'isAccessible',
  args: [address as Ref<Address>, accessCollectionAccessibleTokenId as Ref<bigint>],
  enabled: computed(() => !!address.value && !!accessCollectionAccessibleTokenId.value),
})

const { data: revolvingLendingAccessibleTokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [revolvingLendingSmartNFTAddress],
  enabled: computed(() => !!address.value),
})

const { data: isRevolvingLendingAccessible, refetch: revolvingLendingSmartNFTRefetch } = useContractRead({
  ...smartManagerConfig,
  functionName: 'isAccessible',
  args: [address as Ref<Address>, revolvingLendingAccessibleTokenId as Ref<bigint>],
  enabled: computed(() => !!address.value && !!revolvingLendingAccessibleTokenId.value),
})

function onCombinationRunHandler() {
  if (!isAccessCollectionAccessible.value) {
    message.error('Place Mint Asset Collection NFT')
    return
  }

  if (!isRevolvingLendingAccessible.value) {
    message.error('Place Mint Revolving Lending NFT')
    return
  }

  showCombinationRunHandler()
}

const config = useReNFTConfig()

const { writeAsync: accessCollectionSmartNFTWriteAsync, wait: accessCollectionSmartNFTWait } = useContractWrite({
  ...config,
  functionName: 'mint',
  args: [accessCollectionSmartNFTAddress, address as Ref<Address>, 1n],
})

const { writeAsync: revolvingLendingSmartNFTWriteAsync, wait: revolvingLendingSmartNFTWait } = useContractWrite({
  ...config,
  functionName: 'mint',
  args: [revolvingLendingSmartNFTAddress, address as Ref<Address>, 1n],
})

const isLoading = ref(false)

async function onMintAllHandler() {
  try {
    isLoading.value = true
    if (!isAccessCollectionAccessible.value) {
      await accessCollectionSmartNFTWriteAsync()
      await accessCollectionSmartNFTWait()
      accessCollectionSmartNFTRefetch()
      message.success('Success')
    }

    if (!isRevolvingLendingAccessible.value) {
      await revolvingLendingSmartNFTWriteAsync()
      await revolvingLendingSmartNFTWait()
      revolvingLendingSmartNFTRefetch()
      message.success('Success')
    }
  }
  catch (error: any) {
    message.error(error.details || error.message)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="description">
    <div class="content">
      <h1 class="title">
        A revolutionary intent-centric solution based on ERC-7513 for faster and smarter transactions.
      </h1>

      <div class="description-list">
        <span>One-click, Modules flow, all done!</span>
        <span>·Multi-token Swapper: seamlessly swap your multi-tokens into one token with one click.</span>
        <span>·Revolving Loan: automates the process of leveraging your assets by repeating the supply-borrow-swap loop.</span>
      </div>

      <div class="button-wrap">
        <n-button v-if="!isAccessCollectionAccessible && !isRevolvingLendingAccessible" size="large" class="button" :loading="isLoading" @click="onMintAllHandler">
          Mint All
        </n-button>
        <n-button v-else size="large" class="button" @click="onCombinationRunHandler">
          Combination Run
        </n-button>

        <span class="tip">Mint NFTs of different functions and unlock the Module-Flow running experience.</span>
      </div>
    </div>

    <div class="nfts">
      <AppNFTCard name="NFTa-Multi-token Swapper" :image="AssetCollectionImage" :contract="accessCollectionSmartNFTAddress" class="asset-collection" />
      <AppNFTCard name="NFTb-Revolving Loan Maker" :image="RevolvingLendingImage" :contract="revolvingLendingSmartNFTAddress" class="revolving-lending" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  display: flex;
  justify-content: space-between;
  padding-bottom: 66px;
  gap: 12px;

  .content {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .title {
      font-size: 32px;
      line-height: 46px;
      font-weight: 900;
      margin: 0;
    }

    .description-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-size: 16px;
      line-height: 20px;
    }

    .button-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;

      .button {
        width: 226px;
      }

      .tip {
        font-size: 12px;
        line-height: 20px;
        opacity: .6;
      }
    }
  }

  .nfts {
    display: flex;
    align-items: flex-start;

    .asset-collection {
      position: relative;
      transform: translateX(10px);
      z-index: 1;
    }

    .revolving-lending {
      transform: translateY(120px);
    }
  }
}
</style>
