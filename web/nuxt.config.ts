import process from 'node:process'
import minimist from 'minimist'
import { loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const argv = minimist(process.argv.slice(2))
const env = loadEnv(argv.dotenv, 'root', 'NUXT')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: Object.keys(env).reduce((ret, e) => ({
      ...ret,
      [e.slice(5)]: env[e],
    }), {}),
  },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      title: 'ModuFlow',
      meta: [
        { hid: 'description', name: 'description', content: 'A new generation of revolutionary standards 7531NFT with practical value.' },
      ],
    },
  },

  components: [
    { path: '~/components/base', pathPrefix: false },
    '~/components',
  ],

  imports: {
    dirs: [
      'abis',
      'composables/**',
    ],
  },

  modules: [
    '@vueuse/nuxt',
    ['@use-wagmi/nuxt', {
      excludeImports: [
        'useQuery',
        'useQueryClient',
        'useQueryClient',
        'useInfiniteQuery',
        'useContractWrite',
      ],
    }],
  ],

  css: [
    '@/assets/style/index.scss',
  ],

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://www-t.a3sprotocol.xyz/api',
        changeOrigin: true,
      },
    },
  },

  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },
    plugins: [
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNaiveUIMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
