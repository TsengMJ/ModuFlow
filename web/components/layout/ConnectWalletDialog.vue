<script lang="ts" setup>
import type { Connector } from 'use-wagmi/connectors'
import { extensions } from '@/constants'

const message = useMessage()
const { showModal, hideHandler } = useModal({ name: 'connect-wallet' })
const { target: chainId } = useNetworkOptions()
const { connectors, connectAsync } = useConnect()
const { disconnect } = useDisconnect()

async function onConnect(connector: Connector) {
  try {
    if (!connector.ready)
      window.open(extensions[connector.name])

    hideHandler()
    await connectAsync({ connector, chainId })
  }
  catch (error: any) {
    message.error(error.details || error.message)
  }
}

function onDisconnect() {
  disconnect()
  hideHandler()
}
</script>

<template>
  <Dialog v-model:show="showModal" title="Connect wallet" style="width: 336px;" padding="12px">
    <div class="connectors">
      <div v-for="connector in connectors" :key="connector.name" class="connector-item" @click="onConnect(connector)">
        <img :src="`/connectors/${connector.name}.png`" class="connector-logo">
        <span>{{ `${!connector.ready ? 'Install ' : ''}${connector.name}` }}</span>
      </div>
    </div>
    <n-button class="disconnect" @click="onDisconnect">
      Disconnect
    </n-button>
  </Dialog>
</template>

<style lang="scss" scoped>
.connectors {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .connector-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    transition: color .3s;
    padding: 20px 0;
    gap: 8px;
    cursor: pointer;

    &:hover {
      background: #272F3E;
    }

    .connector-logo {
      width: 60px;
      height: 60px;
    }
  }
}

.disconnect {
  width: 100%;
  margin-top: 12px;
}
</style>
