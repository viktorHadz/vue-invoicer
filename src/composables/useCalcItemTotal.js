import { usePrecision } from '@vueuse/math'

export function useCalcItemTotal(itemPrice, itemTime, itemQty) {
  const itemTotal = itemPrice * itemTime * itemQty
  const total = usePrecision(itemTotal, 2)
  return total.value
}
