<script lang="ts" setup>
withDefaults(
  defineProps<{
    uniswap?: boolean
    aave?: boolean
  }>(),
  {
    uniswap: true,
    aave: true,
  },
)
</script>

<template>
  <div class="footer">
    <div v-if="uniswap" class="item">
      <span>Asset Collection By</span>
      <img src="~assets/images/app/uniswap.png">
    </div>

    <div v-if="aave" class="item">
      <span>Asset Collection By</span>
      <img src="~assets/images/app/aave.png">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: flex;
  padding: 12px 0;
  font-size: 12px;
  color: rgba($color: #FFFFFF, $alpha: .6);
  line-height: 14px;
  background: #272F3E;
  margin: 0 -20px;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
}
</style>
