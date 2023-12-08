import { erc20ABI } from 'use-wagmi'
import type { Address } from '@/types'

const checkAll = ref(false)
const checkedAssets = ref<Address[]>([])
const checkedAssets2 = ref([])

export function useAssetsOptions() {
  const { address: account } = useAccount()
  const tokenAddresses: Address[] = [
    '0xfB4CeA030Fa61FC435E922CFDc4bF9C80456E19b',
    '0x3A38c4d0444b5fFcc5323b2e86A21aBaaf5FbF26',
    '0xBDE7fbbb1DC89E74B73C54Ad911A1C9685caCD83',
  ]

  const { data: decimalsResults } = useContractReads({
    enabled: computed(() => !!account.value),
    contracts: tokenAddresses.map(address => ({
      address,
      abi: erc20ABI,
      functionName: 'decimals',
    })),
  })

  const options = computed(() => {
    return tokenAddresses.map((address, index) => ({
      address,
      decimals: (decimalsResults.value ? decimalsResults.value[index].result : 18) as number,
    }))
  })

  const indeterminate = computed(() => !!(checkedAssets.value.length && checkedAssets.value.length !== tokenAddresses.length))

  watch(checkedAssets, () => {
    checkAll.value = checkedAssets.value.length === tokenAddresses.length
  })

  return {
    options,
    checkedAssets,
    checkedAssets2,
    indeterminate,
    checkAll,
  }
}
