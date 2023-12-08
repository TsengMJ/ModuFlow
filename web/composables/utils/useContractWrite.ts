import type { UseContractWriteConfig } from 'use-wagmi'
import { useContractWrite as _useBaseContractWrite } from 'use-wagmi'
import type { WriteContractMode, WriteContractResult, WriteContractUnpreparedArgs } from '@wagmi/core'
import type { Abi } from 'abitype'
import type { SendTransactionParameters } from 'viem'
import type { DeepMaybeRef } from '@/types'

type MutationFnArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = Omit<DeepMaybeRef<SendTransactionParameters>, 'account' | 'chain'> &
DeepMaybeRef<{
  args?: WriteContractUnpreparedArgs<TAbi, TFunctionName> extends {
    args: unknown
  }
    ? WriteContractUnpreparedArgs<TAbi, TFunctionName>['args']
    : unknown
}>

type MutationFn<
  TMode extends WriteContractMode,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TReturnType,
> = TMode extends 'prepared'
  ? (() => TReturnType) | undefined
  : (config?: MutationFnArgs<TAbi, TFunctionName>) => TReturnType

export function useContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(config: UseContractWriteConfig<TAbi, TFunctionName, TMode>) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork, switchNetworkAsync } = useSwitchNetwork()
  const chainId = useLastChainId()
  const { showHandler } = useModal({ name: 'connect-wallet' })

  const result = _useBaseContractWrite(config)
  const { refetch: wait, isLoading: waitLoading } = useWaitForTransaction({
    hash: computed(() => result.data.value?.hash),
    enabled: computed(() => !!result.data.value?.hash),
    confirmations: 1,
  })

  const isLoading = computed(() => result.isLoading.value || waitLoading.value)

  const _write = result.write
  const write = (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) => {
    if (!isConnected.value) {
      showHandler()
      throw new Error('Please connect wallet')
    }

    if (chain?.value?.unsupported) {
      switchNetwork(chainId)
      throw new Error('Please switch network')
    }

    return _write?.(overrideConfig)
  }

  const _writeAsync = result.writeAsync
  const writeAsync = async (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) => {
    if (!isConnected.value) {
      showHandler()
      throw new Error('Please connect wallet')
    }

    if (chain?.value?.unsupported)
      await switchNetworkAsync(chainId)

    const result = await _writeAsync?.(overrideConfig)
    return result
  }

  return {
    ...result,
    isLoading,
    wait,
    write: write as MutationFn<TMode, TAbi, TFunctionName, void>,
    writeAsync: writeAsync as MutationFn<
      TMode,
      TAbi,
      TFunctionName,
      Promise<WriteContractResult>
    >,
  }
}
