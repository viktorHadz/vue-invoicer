import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('clients', () => {
  const clients = ref([
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

  // Selected client reference
  const selectedClient = ref(null)

  return { clients, selectedClient }
})
