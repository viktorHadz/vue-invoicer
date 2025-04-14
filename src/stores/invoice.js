import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useCalcTotals } from '@/composables/useCalcTotals.js'
import { useCalcItemTotal } from '@/composables/useCalcItemTotal'

export const useInvoiceStore = defineStore('invoice', () => {
  const data = reactive({
    client: { id: 0, name: '', company: '', address: '' },
    invoiceNumber: '#S.A.M.-1',
    createdDate: '',
    dueDate: '',
    items: [],
    prices: {
      vatPercent: 20,

      discValue: 0,
      discValuePercent: 0,
      discPercent: true,

      subtotal: 0,
      vat: 0,

      depoValue: 0,
      depoValuePercent: 0,
      depoPercent: true,

      total: 0,
    },
  })

  const resetInvoiceData = () => {
    data.items = []
    useCalcTotals(data, data.prices.vatPercent)
  }

  const add = (item) => {
    console.log('Store received:', item)

    let index = data.items.findIndex((toFind) => toFind.id === item.id)
    const target = data.items[index]

    if (target !== undefined) {
      const quantity = target.qty + item.qty
      const newItemTotal = useCalcItemTotal(target.price, target.time, quantity)
      const toAdd = { ...item, qty: quantity, itemTotal: newItemTotal }
      data.items.splice(index, 1, toAdd)
    } else {
      const newItemTotal = useCalcItemTotal(item.price, item.time, item.qty)
      const newItem = { ...item, itemTotal: newItemTotal }

      data.items.push(newItem)
    }
    useCalcTotals(data, data.prices.vatPercent)
  }
  const remove = () => {}
  const update = () => {}

  return { data, add, remove, update, resetInvoiceData }
})
