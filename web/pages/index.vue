<script lang="ts" setup>
import assetCollectionNFTData from '@/assets/lib/asset-collection-nft.json'
import revolvingLendingNFTData from '@/assets/lib/revolving-lending-nft.json'
import combinationRunData from '@/assets/lib/combination-run.json'

definePageMeta({
  layout: 'launch',
})
</script>

<template>
  <div class="launch">
    <div class="container">
      <h1>ModuFlow</h1>
      <div class="desc">
        A revolutionary intent-centric solution based on ERC-7513 for faster and smarter transactions.
      </div>
    </div>

    <div class="lotties">
      <LaunchLottieCard
        name="NFTa-Multi-token Swapper "
        desc="Multi-token Swapper: seamlessly swap your multi-tokens into one token with one click."
        :animation-data="assetCollectionNFTData"
      />
      <LaunchLottieCard
        name="NFTb-Revolving Loan Maker"
        desc="Revolving Loan: automates the process of leveraging your assets by repeating the supply-borrow-swap loop."
        :animation-data="revolvingLendingNFTData"
      />
      <LaunchLottieCard
        class="combination-run"
        name="Combination Run"
        desc="One-click, Modules flow, all done!"
        :animation-data="combinationRunData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.launch {
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  gap: 60px;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    h1 {
      font-size: 60px;
      font-weight: 900;
      line-height: 85px;
      margin: 0;
    }

    .desc {
      width: 446px;
      text-align: center;
    }
  }

  .lotties {
    display: grid;
    gap: 60px 16px;

    .combination-run {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
}
</style>
