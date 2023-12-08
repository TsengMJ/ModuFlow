<script lang="ts" setup>
const { columns } = useRecordData()
const data = useLocalStorage('transactions', [])
</script>

<template>
  <div class="record">
    <span class="title">Records</span>
    <n-data-table :columns="columns" :data="data">
      <template #empty>
        <n-empty description=" ">
          <template #icon>
            <n-icon>
              <IconEmpty />
            </n-icon>
          </template>
        </n-empty>
      </template>
    </n-data-table>
  </div>
</template>

<style lang="scss" scoped>
.record {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-size: 18px;
    font-weight: 900;
    line-height: 26px;
  }
}
</style>
