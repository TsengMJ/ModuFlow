import { h } from 'vue'
import { NSpace } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { erc20ABI } from 'use-wagmi'
import type { Address } from '@/types'

const address = ref<Address>('0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf')

export function useTransferAsset() {
  const { address: account } = useAccount()
  const { data: balance } = useContractRead({
    enabled: computed(() => !!account.value),
    address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [account as Ref<Address>],
  })

  const { data: decimals } = useContractRead({
    enabled: computed(() => !!account.value),
    address: address.value,
    abi: erc20ABI,
    functionName: 'decimals',
  })

  function renderLabel(option: SelectOption) {
    return h(
      NSpace,
      { size: 8, wrapItem: false, align: 'center' },
      {
        default: () => [
          h('img', { src: `/tokens/${option.label}.png`, width: 24, height: 24 }),
          option.label,
        ],
      },
    )
  }

  const options = [
    {
      label: 'USDC',
      value: '0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf',
    },
  ]

  return {
    address,
    balance,
    decimals,
    options,
    renderLabel,
  }
}
