<template>
  <div class="headerbar">
    <img src="/logo.png" class="logo">
    <nuxt-link to="/app">
      <n-button>
        Launch APP
      </n-button>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.headerbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  .logo {
    width: 172px;
    height: 28px;
  }
}
</style>
