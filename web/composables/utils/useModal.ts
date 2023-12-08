const state: { [key: string]: Ref<boolean> } = {}

type ModalName =
  | 'connect-wallet'
  | 'asset-collection-nft'
  | 'revolving-lending-nft'
  | 'combination-run'

export interface ModalParams {
  name: ModalName
}

export function useModal({ name }: ModalParams) {
  if (!state[name])
    state[name] = ref(false)

  const showModal = state[name]

  const showHandler = () => state[name].value = true
  const hideHandler = () => state[name].value = false
  const toggleHandler = () => state[name].value = !state[name].value

  return {
    showModal,
    showHandler,
    hideHandler,
    toggleHandler,
  }
}
