<script lang="ts" setup>
withDefaults(
  defineProps<{
    padding?: string
  }>(),
  {
    padding: '20px 40px',
  },
)
</script>

<template>
  <n-modal transform-origin="center" preset="dialog" bordered :show-icon="false">
    <div class="content" :style="{ padding }">
      <slot />
    </div>
  </n-modal>
</template>
