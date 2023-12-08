export function useLastChainId() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const supportedChains = useSupportedChains()

  return computed(() => {
    if (!isConnected.value)
      return supportedChains[0].id

    if (chain?.value?.unsupported)
      return supportedChains[0].id
    return chain?.value?.id as number
  })
}
