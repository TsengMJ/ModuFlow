<script lang="ts" setup>
import type { GetFunctionArgs } from 'viem'
import { encodeAbiParameters, parseAbiParameters, parseUnits } from 'viem'
import type { Address, Transaction } from '@/types'

type ExecuteIntentArgs = GetFunctionArgs<typeof IntentAbstractAccountABI, 'executeIntent'>['args']

const store = useLocalStorage<Transaction[]>('transactions', [])
const { showModal, hideHandler } = useModal({ name: 'asset-collection-nft' })

const message = useMessage()
const { address: account } = useAccount()
const { checkedAssets, options } = useAssetsOptions()
const { address: transferAssetAddress } = useTransferAsset()

const smartManagerConfig = useSmartManagerConfig()
const { address: smartNFTAddress } = useAccessCollectionSmartNFTAddress()

const { data: accessCollectionAccessibleTokenId } = useContractRead({
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
                [address, transferAssetAddress.value],
                1672502400000n,
              ],
            ],
          ),
        }
      })
      return result
    }),
  ] as unknown as ExecuteIntentArgs,
})

const isLoading = ref(false)

async function onAssetCollectionHandler() {
  try {
    isLoading.value = true
    const { hash } = await writeAsync()
    await wait()
    store.value.unshift({
      time: Date.now(),
      type: 'Token Swap',
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
  }
}
</script>

<template>
  <Dialog v-model:show="showModal" title="Asset Collection NFT" padding="0">
    <div class="container">
      <div class="content">
        <AppAssetsOptions />
        <n-icon color="#fff" size="40">
          <IconArrow />
        </n-icon>
        <n-space vertical :size="20">
          <AppTransferAsset />
        </n-space>
      </div>

      <n-button class="button" :disabled="!checkedAssets.length" :loading="isLoading" @click="onAssetCollectionHandler">
        Confirm
      </n-button>

      <div class="tip">
        *This is the asset details of your contract wallet.
      </div>

      <AppCombinationFooter :aave="false" />
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
