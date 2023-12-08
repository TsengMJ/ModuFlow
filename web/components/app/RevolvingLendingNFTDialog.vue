<script lang="ts" setup>
import type { GetFunctionArgs } from 'viem'
import { erc20ABI } from 'use-wagmi'
import { encodeAbiParameters, formatUnits, maxUint256, parseAbiParameters, parseUnits } from 'viem'
import type { Address, Transaction } from '@/types'

type ExecuteIntentArgs = GetFunctionArgs<typeof IntentAbstractAccountABI, 'executeIntent'>['args']

const { showModal, hideHandler } = useModal({ name: 'revolving-lending-nft' })
const store = useLocalStorage<Transaction[]>('transactions', [])

const message = useMessage()
const { address: account } = useAccount()
const { address: inputAsset, balance, decimals } = useTransferAsset()
const { address: outputAsset } = useUnderlyingAsset()
const { leverage } = useLeverage()

const smartManagerConfig = useSmartManagerConfig()
const { address: smartNFTAddress } = useRevolvingLendingSmartNFTAddress()

const { data: intentAbstractAccounTokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [smartNFTAddress],
  enabled: computed(() => !!account.value),
})

const config = useIntentAbstractAccountConfig()
const { writeAsync, wait } = useContractWrite({
  ...config,
  functionName: 'executeIntent',
  args: [
    computed(() => {
      return [
        {
          tokenId: intentAbstractAccounTokenId.value,
          executeParam: !account.value
            ? '0x00'
            : encodeAbiParameters(
              parseAbiParameters('(uint256, uint256, address, address, address)'),
              [
                [
                  BigInt(leverage.value),
                  (parseUnits('1', decimals.value as number) || 0n) as unknown as bigint,
                  account.value as Address,
                  inputAsset.value,
                  outputAsset.value,
                ],
              ],
            ),
        },
      ]
    }),
  ] as unknown as ExecuteIntentArgs,
})

const isLoading = ref(false)

const { data: allowance, refetch } = useContractRead({
  address: inputAsset,
  abi: erc20ABI,
  functionName: 'allowance',
  args: [account as Ref<Address>, config.address],
  enabled: computed(() => !!account.value),
})

const { writeAsync: approveAsync, wait: approveWait } = useContractWrite({
  address: inputAsset,
  abi: erc20ABI,
  functionName: 'approve',
  args: [config.address, maxUint256],
})

async function onRevolvingLendingHandler() {
  try {
    if (!allowance)
      throw new Error('Network Error!')

    isLoading.value = true

    if (
      !allowance.value
        && formatUnits(balance.value as bigint, decimals.value as number) > formatUnits(allowance.value as bigint, decimals.value as number)
    ) {
      await approveAsync()
      await approveWait()
    }
    const { hash } = await writeAsync()
    await wait()
    store.value.unshift({
      time: Date.now(),
      type: 'Revolving',
      hash,
    })
    hideHandler()
    message.success('Success')
  }
  catch (error: any) {
    message.error(error.details || error.message)
  }
  finally {
    isLoading.value = false
    refetch()
  }
}
</script>

<template>
  <Dialog v-model:show="showModal" title="Revolving Lending NFT" padding="0">
    <div class="container">
      <div class="content">
        <n-space vertical :size="20">
          <AppTransferAsset />
          <AppLeverage />
          <AppUnderlyingAsset />
        </n-space>
      </div>

      <n-button class="button" :loading="isLoading" @click="onRevolvingLendingHandler">
        Confirm
      </n-button>

      <AppCombinationFooter :uniswap="false" />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 40px 0;
    gap: 20px;
  }

  .button {
    width: 336px;
  }
}
</style>
