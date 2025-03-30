import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemsStore = defineStore('items', () => {
  const fakeItems = ref([])
  const fetchStyles = async () => {
    fetch('https://dummyjson.com/products?limit=10&skip=10')
      .then((res) => res.json())
      .then((data) => {
        // console.log('Initial fetch', data)
        // console.log('Fetched products:', data.products)
        fakeItems.value.push(...data.products)
        console.log('Fake items: ', fakeItems.value)
      })
      .catch((error) => console.error('Error:', error))
  }

  return { fakeItems, fetchStyles }
})

// { client: 1, name: 'T-Shirt', type: 'style', price: 100, time: 'N/A' },
// { client: 1, name: 'Jeans', type: 'sample', price: 60, time: 30 },
// { client: 2, name: 'Jacket', type: 'style', price: 110, time: 'N/A' },
// { client: 2, name: 'Skirt', type: 'sample', price: 70, time: 25 },
// { client: 3, name: 'Coat', type: 'style', price: 120, time: 'N/A' },
// { client: 3, name: 'Shorts', type: 'sample', price: 80, time: 20 }
