import { defineStore } from 'pinia'
import { reactive, ref, watch, computed } from 'vue'

export const useClientStore = defineStore('clients', () => {
  const loadClients = () => {
    let clients = [
      {
        id: 1,
        name: 'Viktor',
        company: 'CompanyLTD',
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
    ]
    localStorage.setItem('clients', JSON.stringify(clients))
    return clients
  }
  const clients = reactive(loadClients())

  const loadSelectedClient = () => {

    const saved = localStorage.getItem('selectedClient')

    return saved ? JSON.parse(saved) : null
  }

  const selectedClient = ref(loadSelectedClient())

  watch(
    selectedClient,
    (newValue) => {
      if (newValue) {
        localStorage.setItem('selectedClient', JSON.stringify(newValue))
      } else {
        localStorage.removeItem('selectedClient')
      }
    },
    { deep: true }
  )

  watch(
    clients,
    (newClients) => {
      localStorage.setItem('clients', JSON.stringify(newClients))
    },
    { deep: true }
  )

  const createNew = (client) => {
    console.log('Store add ran')
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1
    clients.push({
      id: newId,
      ...client,
    })
  }

  const update = (client) => {
    console.log(`Updating client with id-${client.id}`)
    const index = clients.findIndex((cleni) => cleni.id === client.id)
    if (index !== -1) {
      Object.assign(clients[index], client)

      // Update selectedClient if it's the same client
      if (selectedClient.value && selectedClient.value.id === client.id) {
        selectedClient.value = { ...clients[index] }
      }
    }
  }

  const del = (client) => {
    const index = clients.findIndex(c => c.id === client.id)
    if (index !== -1) {
      clients.splice(index, 1)
      // Clear selectedClient if it was deleted
      if (selectedClient.value && selectedClient.value.id === client.id) {
        selectedClient.value = null
      }
    }
  }

  const setClient = (client) => {
    // Handle both string and object formats
    selectedClient.value = typeof client === 'string' ? JSON.parse(client) : client
    console.log('Set client: ', selectedClient.value.id, '-', selectedClient.value.name)
  }

  const hasClients = computed(() => clients.length > 0)

  return { clients, selectedClient, setClient, createNew, hasClients, del, update }
})