import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NIcon, NSpace } from 'naive-ui'
import { avalancheFuji } from 'use-wagmi/chains'
import type { Transaction } from '@/types'
import { NuxtLink } from '#components'
import { Share } from '@/components/icon'

export function useRecordData() {
  const columns: DataTableColumns<Transaction> = [
    {
      title: 'Time',
      key: 'time',
      render(row) {
        return formatDate(row.time)
      },
    },
    {
      title: 'Type',
      key: 'type',
    },
    {
      title: 'TxHash',
      key: 'hash',
      render(row) {
        return h(
          NuxtLink,
          { href: `${avalancheFuji.blockExplorers.default.url}/tx/${row.hash}`, target: '_blank', style: { textDecoration: 'underline' } },
          {
            default: () => h(
              NSpace,
              { wrapItem: false, size: 4, align: 'center' },
              {
                default: () => [
                  formatAddress(row.hash),
                  h(NIcon, { size: 12, color: '#fff' }, { default: () => h(Share) }),
                ],
              },
            ),
          },
        )
      },
    },
  ]

  return {
    columns,
  }
}
