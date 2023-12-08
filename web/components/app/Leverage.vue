<script lang="ts" setup>
const { leverage } = useLeverage()
</script>

<template>
  <div class="leverage">
    <span class="label">Revolving Times</span>
    <n-input-number v-model:value="leverage" :min="1">
      <template #suffix>
        X
      </template>
    </n-input-number>
  </div>
</template>

<style lang="scss" scoped>
.leverage {
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
