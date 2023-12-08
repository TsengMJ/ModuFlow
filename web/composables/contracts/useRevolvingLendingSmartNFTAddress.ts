import type { Address } from '@/types'

export function useRevolvingLendingSmartNFTAddress() {
  const { public: config } = useRuntimeConfig()

  return {
    address: config.REVOLVEING_LENDING_SMART_NFT_ADDRESS as Address,
  }
}
