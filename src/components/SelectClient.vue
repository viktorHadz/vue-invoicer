<script setup>
import { useClientStore } from '@/stores/clients'
import { onMounted } from 'vue'
const clients = useClientStore()

onMounted(() => {
  console.log('Client Select: Checking LS for client')

  if (clients.selectedClient === null) {
    console.log('Checking LS for client =>', clients.selectedClient)
    const storedValue = localStorage.getItem('selectedClient')
    if (storedValue !== null) {
      console.table('Client found')
      clients.setClient(storedValue)
    } else {
      console.warn('No client found. Select a client to continue')
    }
  }
})
</script>

<template>
  <select v-model="clients.selectedClient">
    <option disabled value="">Please select one</option>
    <option v-for="client in clients.clients" :key="client.id" v-bind:value="client">
      {{ client.name }}
    </option>
  </select>
</template>

<style></style>
