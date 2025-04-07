import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useInvoiceStore = defineStore('invoice', () => {
  const data = reactive({
    client: { id: 0, name: '', company: '', address: '' },
    invoiceNumber: '#S.A.M.-1',
    createdDate: '',
    dueDate: '',
    items: [{}],
  })
  return { data }
})
