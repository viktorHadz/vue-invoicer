<script setup>
import { useClientStore } from '@/stores/clients'
const clients = useClientStore()
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
