<script setup>
import { useClientStore } from '@/stores/clients'
import SelectClient from './SelectClient.vue'
const store = useClientStore()
</script>
<template>
  <Teleport to="body">
    <div v-if="store.selectedClient === null && store.hasClients" class="backdrop">
      <div class="modal-outer rounded">
        <div class="modal-inner p-2">
          <!-- Title -->
          <h3 class="text-center">Please select a client to continue</h3>
          <SelectClient></SelectClient>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
