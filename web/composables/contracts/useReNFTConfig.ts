import type { Address } from '@/types'

export function useReNFTConfig() {
  const { public: config } = useRuntimeConfig()

  return {
    address: config.RE_NFT_ADDRESS as Address,
    abi: ReNFTABI,
  }
}
