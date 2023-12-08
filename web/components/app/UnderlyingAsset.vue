<script lang="ts" setup>
const { address, options, renderLabel } = useUnderlyingAsset()
</script>

<template>
  <div class="transfer-asset">
    <span class="label">Borrowing Token</span>
    <n-select v-model:value="address" :options="options" :render-label="renderLabel" />
  </div>
</template>

<style lang="scss" scoped>
.transfer-asset {
  width: 336px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .label {
    font-size: 12px;
    line-height: 14px;
    color: rgba($color: #fff, $alpha: .6);
  }
}
</style>
