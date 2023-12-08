export function useNetworkOptions() {
  const { chain } = useNetwork()
  const supportedChains = useSupportedChains()

  const unsupported = computed(() => chain?.value?.unsupported)
  const current = ref<number | string>(supportedChains[0].id)
  const target = computed(() => unsupported.value ? supportedChains[0].id : current.value as number)
  const options = computed(() => supportedChains.map(chain => ({
    label: chain.name,
    value: chain.id,
  })))

  watchEffect(() => {
    const id = chain?.value?.id
    current.value = id ? unsupported.value ? 'Wrong network' : id : supportedChains[0].id
  })

  return {
    target,
    current,
    options,
    unsupported,
  }
}
