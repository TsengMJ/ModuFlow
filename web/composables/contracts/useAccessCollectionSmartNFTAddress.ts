import type { Address } from '@/types'

export function useAccessCollectionSmartNFTAddress() {
  const { public: config } = useRuntimeConfig()

  return {
    address: config.ACCESS_COLLECTION_SMART_NFT_ADDRESS as Address,
  }
}
