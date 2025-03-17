<script setup>
import { useClientStore } from '@/stores/clients'
const clients = useClientStore()
</script>
<template>
  <div>
    <label for="select-client-menu">Select a client:</label>
    <select name="clients" id="select-client-menu">
      <option value="select-text">Select a client...</option>
      <option :value="client.id" v-for="client in clients.clients" :key="client.id">
        {{ client.name }}
      </option>
    </select>
  </div>
</template>
<style></style>
