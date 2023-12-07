import { UseWagmiPlugin, configureChains, createConfig } from 'use-wagmi'

import { InjectedConnector } from 'use-wagmi/connectors/injected'
import { MetaMaskConnector } from 'use-wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'use-wagmi/connectors/walletConnect'

import { alchemyProvider } from 'use-wagmi/providers/alchemy'
import { infuraProvider } from 'use-wagmi/providers/infura'
import { publicProvider } from 'use-wagmi/providers/public'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const supportedChains = useSupportedChains()

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    supportedChains,
    [
      alchemyProvider({ apiKey: runtimeConfig.public.ALCHEMY_API_KEY }),
      infuraProvider({ apiKey: runtimeConfig.public.INFURA_API_KEY }),
      publicProvider(),
    ],
  )

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'Core',
          shimDisconnect: true,
          getProvider() {
            return window.avalanche
          },
        },
      }),
      new MetaMaskConnector({
        chains,
        options: {
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: runtimeConfig.public.WALLETCONNECT_PROJECT_ID,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
  })

  nuxtApp.vueApp.use(UseWagmiPlugin, config)
})
