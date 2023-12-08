<script lang="ts" setup>
import type { GetFunctionArgs } from 'viem'
import { encodeAbiParameters, parseAbiParameters, parseUnits } from 'viem'
import type { Address, Transaction } from '@/types'

type ExecuteIntentArgs = GetFunctionArgs<typeof IntentAbstractAccountABI, 'executeIntent'>['args']

const store = useLocalStorage<Transaction[]>('transactions', [])
const { showModal, hideHandler } = useModal({ name: 'combination-run' })

const message = useMessage()
const { address: account } = useAccount()
const { checkedAssets, options } = useAssetsOptions()
const { address: outputAsset } = useUnderlyingAsset()
const { address: inputAsset, decimals } = useTransferAsset()
const { leverage } = useLeverage()

const smartManagerConfig = useSmartManagerConfig()
const { address: accessCollectionSmartNFTAddress } = useAccessCollectionSmartNFTAddress()
const { address: revolvingLendingSmartNFTAddress } = useRevolvingLendingSmartNFTAddress()

const { data: accessCollectionAccessibleTokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [accessCollectionSmartNFTAddress],
  enabled: computed(() => !!account.value),
})

const { data: revolvingLendingTokenId } = useContractRead({
  ...smartManagerConfig,
  functionName: 'smartNFTTokenIdOf',
  args: [revolvingLendingSmartNFTAddress],
  enabled: computed(() => !!account.value),
})

const config = useIntentAbstractAccountConfig()
const { writeAsync, wait } = useContractWrite({
  ...config,
  functionName: 'executeIntent',
  args: [
    computed(() => {
      if (!account.value)
        return []
      const result = checkedAssets.value.map((address) => {
        const target = options.value.find(option => option.address === address)

        return {
          tokenId: accessCollectionAccessibleTokenId.value,
          executeParam: encodeAbiParameters(
            parseAbiParameters('(uint256, address, address[], uint256)'),
            [
              [
                parseUnits('1', target?.decimals as number),
                account.value as Address,
                [address, inputAsset.value],
                1672502400000n,
              ],
            ],
          ),
        }
      })

      result.push({
        tokenId: revolvingLendingTokenId.value,
        executeParam: encodeAbiParameters(
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
      })
      return result
    }),
  ] as unknown as ExecuteIntentArgs,
})

const isLoading = ref(false)

async function onCombinationRunHandler() {
  try {
    isLoading.value = true
    const { hash } = await writeAsync()
    await wait()
    store.value.unshift({
      time: Date.now(),
      type: 'ModulesFlow',
      hash,
    })
    hideHandler()
    message.success('Success')
  }
  catch (error: any) {
    message.error(error.details || error.message)
    throw error
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:show="showModal" title="Combination Run" padding="0">
    <div class="container">
      <div class="content">
        <AppAssetsOptions />
        <n-icon color="#fff" size="40">
          <IconArrow />
        </n-icon>
        <n-space vertical :size="20">
          <AppTransferAsset />
          <AppLeverage />
          <AppUnderlyingAsset />
        </n-space>
      </div>

      <n-button class="button" :disabled="!checkedAssets.length" :loading="isLoading" @click="onCombinationRunHandler">
        Confirm
      </n-button>

      <div class="tip">
        *This is the asset details of your contract wallet.
      </div>

      <AppCombinationFooter />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px 40px 0;
    gap: 20px;
  }

  .button {
    width: 336px;
  }

  .tip {
    width: 100%;
    text-align: left;
    font-size: 12px;
    opacity: .8;
    padding-left: 40px;
  }
}
</style>
