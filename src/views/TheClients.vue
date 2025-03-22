<script setup>
import ClientsTable from '@/components/clients/ClientsTable.vue'
import NoClients from '@/components/clients/NoClients.vue'
import { useClientStore } from '@/stores/clients'
const store = useClientStore()
</script>

<template>
  <div>
    <div v-if="!store.hasClients">
      <NoClients></NoClients>
    </div>
    <div v-else>
      <ClientsTable></ClientsTable>
    </div>
  </div>
</template>
