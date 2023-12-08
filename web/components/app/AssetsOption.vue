<script lang="ts" setup>
import type { Address } from '@/types'

const props = defineProps<{
  address: Address
}>()

const { address } = useIntentAbstractAccountConfig()

const { data: token } = useBalance({
  address,
  token: props.address,
  watch: true,
})
</script>

<template>
  <div class="metadata">
    <img :src="`/tokens/${token?.symbol}.png`">
    <span>{{ token?.symbol }}</span>
  </div>
  <span>{{ formatNumber(Number(token?.formatted || 0)) }}</span>
</template>

<style lang="scss" scoped>
.metadata {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;

  > img {
    width: 24px;
    height: 24px;
  }
}
</style>
