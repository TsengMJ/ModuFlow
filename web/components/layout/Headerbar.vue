<template>
  <div class="headerbar">
    <nuxt-link to="/">
      <img src="/logo.png" class="logo">
    </nuxt-link>
    <LayoutConnectButton />
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
