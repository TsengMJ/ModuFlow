import { h } from 'vue'
import { NSpace } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import type { Address } from '@/types'

const address = ref<Address>('0x0EFD8Ad2231c0B9C4d63F892E0a0a59a626Ce88d')

export function useUnderlyingAsset() {
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
      label: 'WBTC',
      value: '0x0EFD8Ad2231c0B9C4d63F892E0a0a59a626Ce88d',
    },
  ]

  return {
    address,
    options,
    renderLabel,
  }
}
