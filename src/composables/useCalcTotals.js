import { usePrecision } from '@vueuse/math'

export function useCalcTotals(data) {
  console.log('Recalculating totals')

  const sub = () => {
    let subtotal = 0
    data.items.forEach((item) => {
      subtotal += item.itemTotal
    })
    if (data.prices.discValue || data.prices.discValuePercent > 0) {
      subtotal = subtotal - disc()
    }
    return subtotal
  }
  const disc = () => {
    let discoValue = 0
    if (data.prices.discPercent) {
      const disc = data.prices.discValuePercent
      discoValue = (disc / 100) * sub()
    } else {
      discoValue = data.prices.discValue
    }
    return discoValue
  }
  const vatAmmount = () => {
    const vatValue = (data.prices.vatPercent / 100) * sub()
    return vatValue
  }
  const totalAmmount = () => {
    let tot = sub() + vatAmmount()
    if (data.prices.depoValue || data.prices.depoValuePercent > 0) {
      tot += depo()
    }
    return tot
  }
  const depo = () => {
    let dep = 0
    if (data.prices.depoValue || data.prices.depoValuePercent > 0) {
      const depoPercVal = data.prices.depoValuePercent
      dep = (depoPercVal / 100) * totalAmmount()
    } else {
      dep = data.prices.depoValue
    }
    return dep
  }
  const update = () => {
    data.prices.subtotal = usePrecision(sub(), 2)
    data.prices.vat = usePrecision(vatAmmount(), 2)
    data.prices.total = usePrecision(totalAmmount(), 2)
  }
  update()
  console.log(sub())
  console.log(vatAmmount())
  console.log(totalAmmount())
  console.log(disc())
  console.log(depo())
}
