import type { UnwrapRef } from 'vue'
import type { Address } from 'use-wagmi'
import type { QueryFunctionContext } from '@tanstack/vue-query'

export type { Address, Chain } from 'use-wagmi'
export type { Hex } from 'viem'

type Primitive = string | number | boolean | bigint | symbol | undefined | null
type UnwrapLeaf =
  | Primitive
  | Function
  | Date
  | Error
  | RegExp
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>

export type MaybeRef<T> = T | Ref<T>

export type ShallowMaybeRef<T> = {
  [K in keyof T]: T extends Ref<infer V> ? MaybeRef<V> : MaybeRef<T[K]>
}

export type DeepMaybeRef<T> = T extends Ref<infer V>
  ? MaybeRef<V>
  : T extends Array<any> | object
    ? { [K in keyof T]: DeepMaybeRef<T[K]> }
    : MaybeRef<T>

export type DeepUnwrapRef<T> = T extends UnwrapLeaf
  ? T
  : T extends Ref<infer U>
    ? DeepUnwrapRef<U>
    : T extends {}
      ? {
          [Property in keyof T]: DeepUnwrapRef<T[Property]>
        }
      : UnwrapRef<T>

export type GetType<T> = T extends (arg: infer P) => void ? P : string

export interface Contract { [id: number]: Address }

export type QueryFunctionArgs<T extends (...args: any) => any> = QueryFunctionContext<ReturnType<T>>

export interface Transaction {
  type: 'ModulesFlow' | 'Token Swap' | 'Revolving'
  time: number
  hash: Address
}
