<script lang="ts" setup>
import { darkTheme } from 'naive-ui'

const themeOverrides = useThemeOverrides()
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider closable>
        <n-layout position="absolute">
          <n-layout-header position="absolute" bordered>
            <LaunchHeaderbar />
          </n-layout-header>

          <n-layout-content :native-scrollbar="false" position="absolute">
            <div class="main">
              <NuxtPage />
            </div>
          </n-layout-content>
        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
