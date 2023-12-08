<script lang="ts" setup>
import { LottieAnimation } from 'lottie-web-vue'

defineProps<{
  animationData: Object
  name: string
  desc: string
}>()
</script>

<template>
  <div class="card">
    <LottieAnimation :animation-data="animationData" :auto-play="true" :loop="true" />

    <span class="name">{{ name }}</span>
    <span class="desc">{{ desc }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  text-align: center;

  .name {
    font-size: 24px;
    font-weight: 900;
    line-height: 33px;
    margin: 20px 0;
  }

  .desc {
    margin: 0 60px;
  }
}
</style>
