import { createDiscreteApi } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const { loadingBar } = createDiscreteApi(['loadingBar'])

  nuxtApp.hook('page:start', () => loadingBar.start())
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => loadingBar.finish(), 0)
  })
})
