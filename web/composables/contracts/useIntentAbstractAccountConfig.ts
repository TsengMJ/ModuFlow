import type { Address } from '@/types'

export function useIntentAbstractAccountConfig() {
  const { public: config } = useRuntimeConfig()

  return {
    address: config.INTENT_ABSTRACT_ACCOUNT_ADDRESS as Address,
    abi: IntentAbstractAccountABI,
  }
}
