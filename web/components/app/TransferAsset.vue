<script lang="ts" setup>
import { formatUnits } from 'viem'

withDefaults(
  defineProps<{
    showBalance?: boolean
  }>(),
  {
    showBalance: true,
  },
)

const { address, balance, options, renderLabel } = useTransferAsset()
const { data: token } = useToken({ address })
</script>

<template>
  <div class="transfer-asset">
    <div class="label-container">
      <span>Swap Into</span>
      <span v-if="showBalance">Balance: {{ formatNumber(+formatUnits((balance || 0n) as bigint, token?.decimals as number)) }}</span>
    </div>
    <n-select v-model:value="address" :options="options" :render-label="renderLabel" />
  </div>
</template>

<style lang="scss" scoped>
.transfer-asset {
  width: 336px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .label-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    color: rgba($color: #fff, $alpha: .6);
  }
}
</style>
