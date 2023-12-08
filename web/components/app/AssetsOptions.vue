<script lang="ts" setup>
const { options, checkAll, indeterminate, checkedAssets } = useAssetsOptions()

function onChangeHandler() {
  if (checkAll.value)
    checkedAssets.value = options.value.map(option => option.address)

  else
    checkedAssets.value = []
}
</script>

<template>
  <div class="assets">
    <div class="assets-header">
      <n-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onChangeHandler" />
      <div class="assets-label">
        Assets
      </div>
      <div>Amout</div>
    </div>

    <div class="container">
      <n-scrollbar style="max-height: 242px;">
        <n-checkbox-group v-model:value="checkedAssets">
          <div class="options">
            <div v-for="option in options" :key="option.address" class="options-item">
              <n-checkbox :value="option.address" />
              <AppAssetsOption :address="option.address" />
            </div>
          </div>
        </n-checkbox-group>
      </n-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assets {
  width: 336px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .assets-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    font-size: 12px;
    color: rgba($color: #FFFFFF, $alpha: .6);
    line-height: 14px;
    padding: 0 16px;

    .assets-label {
      flex: 1;
    }
  }

  .container {
    background: #272F3E;
    border: 1px solid rgba(255,255,255,0.4);

    .options {
      display: flex;
      flex-direction: column;

      .options-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        gap: 18px;
        border-bottom: 1px solid rgba($color: #E5E5E5, $alpha: .1);

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
