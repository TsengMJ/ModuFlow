const leverage = ref(5)

export function useLeverage() {
  return {
    leverage,
  }
}
