import type { Address } from '@/types'

export function useSmartManagerConfig() {
  const { public: config } = useRuntimeConfig()

  return {
    address: config.SMART_MANAGER_ADDRESS as Address,
    abi: SmartManagerABI,
  }
}
