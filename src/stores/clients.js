import { defineStore } from 'pinia'
import { reactive, ref, watch, computed } from 'vue'

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
    console.log('Store add ran')
    clients.push({
      id: clients.length + 1,
      ...client,
    })
  }
  // Delete client from frontend and db (later)
  const del = (client) => {
    const arrIndex = clients.indexOf(client)
    console.log('Array index of objToRemove', arrIndex);
    clients.splice(arrIndex, 1)
  }
  // We want to achieve the following:
  // If the deleted client is the same as selected. The selectedClient mutst be deleted too. 
  // Then the localstorage must also be updated 

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
   *  On mounted hook resides in - SelectClient.vue
   */
  const setClient = (client) => {
    selectedClient.value = JSON.parse(client)
    console.log('Client set to: ', selectedClient.value)
  }
  // const destroySetClient = () => {

  // }
  const hasClients = computed(() => {
    if (clients.length > 0) {
      return true
    } else {
      return false
    }
  })
  return { clients, selectedClient, setClient, createNew, hasClients, del }
})
