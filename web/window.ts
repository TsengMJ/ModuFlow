import type { WindowProvider } from '@wagmi/connectors'

declare global {
  interface Window {
    avalanche?: WindowProvider
  }
}
