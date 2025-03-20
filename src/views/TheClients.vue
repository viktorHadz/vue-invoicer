<script setup>
import ClientsTable from '@/components/clients/ClientsTable.vue'
import AddClient from '@/components/clients/AddClient.vue'
import NoClients from '@/components/clients/NoClients.vue'
import { computed } from 'vue'
import { useClientStore } from '@/stores/clients'
const store = useClientStore()

const hasClients = computed(() => store.clients.length > 0)
</script>

<template>
  <div>
    <NoClients v-if="!hasClients"></NoClients>
    <ClientsTable></ClientsTable>
    <AddClient></AddClient>
  </div>
</template>
