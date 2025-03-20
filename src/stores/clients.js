import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useClientStore = defineStore('clients', () => {
  const clients = reactive([
    {
      id: 1,
      name: 'Viktor',
      company: 'Company',
      email: 'vikecah@gmail.com',
      address: '37A Glenton Road, Lewisham, London, SE13 5RS',
    },
    {
      id: 2,
      name: 'Anna',
      company: 'TechCorp',
      email: 'anna.techcorp@gmail.com',
      address: '123 Tech Street, Silicon Valley, CA, 94043',
    },
    {
      id: 3,
      name: 'John',
      company: 'Innovate Ltd',
      email: 'john.innovate@gmail.com',
      address: '456 Innovation Drive, New York, NY, 10001',
    },
  ])
  const createNew = (client) => {

    clients.push({
      id: clients.length + 1,
      ...client
    })
  }
  // Selected client reference
  const selectedClient = ref(null)
  // Sets localstorage on CHANGE of selected does NOT initially set
  watch(
    selectedClient,
    (newValue) => {
      if (newValue) {
        localStorage.setItem('selectedClient', JSON.stringify(selectedClient.value))
      }
    },
    { deep: true },
  )
  // This DOES
  /**
   * Sets selectedClient. Needs an onMounted() hook.
   *  On mounted in - SelectClient.vue
   */
  const setClient = (client) => {
    selectedClient.value = JSON.parse(client)
    console.log('Client set to: ', selectedClient.value)
  }
  return { clients, selectedClient, setClient, createNew }
})
