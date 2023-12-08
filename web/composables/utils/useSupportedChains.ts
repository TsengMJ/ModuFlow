import { type Chain } from 'use-wagmi/chains'
import * as chains from 'use-wagmi/chains'

type Chains = {
  [key in string]: Chain
}

export function useSupportedChains(): Chain[] {
  const { public: config } = useRuntimeConfig()

  return (config.SUPPORTED_CHAINS as string).split(',').map(name => (chains as Chains)[name])
}
