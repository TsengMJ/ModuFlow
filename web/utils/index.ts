import type { Address } from '@/types'

export function formatAddress(address: Address, leading: number = 5, trailing: number = 4): string {
  return address.length < leading + trailing
    ? address
    : `${address.substring(0, leading)}...${address.substring(
        address.length - trailing,
      )}`
}

export function formatENS(name: string): string {
  const parts = name.split('.')
  const last = parts.pop()
  if (parts.join('.').length > 24)
    return `${parts.join('.').substring(0, 24)}...`

  return `${parts.join('.')}.${last}`
}

export function formatDate(time: number | string, formatter: string = 'YYYY-MM-DD HH:mm:ss') {
  return `${useDateFormat(+time, formatter, { locales: 'UTC' }).value}`
}

export function formatNumber(target: number) {
  target = +target
  if (!isNumber(target))
    return target
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 10,
    minimumFractionDigits: 0,
  }).format(target)
}

export function isNumber(target: unknown) {
  return typeof target === 'number'
}

export function isInteger(target: number) {
  return target % 1 === 0
}

export function isRangeIn(target: number, min: number = 1, max: number = 10) {
  return target >= min && target <= max
}

export function randomString(length: number = 26) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (!length)
    length = Math.floor(Math.random() * chars.length)

  let str = ''
  for (let i = 0; i < length; i++)
    str += chars[Math.floor(Math.random() * chars.length)]

  return str
}
