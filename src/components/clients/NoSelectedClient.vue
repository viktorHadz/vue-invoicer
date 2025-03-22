<script setup>
import { useClientStore } from '@/stores/clients'
import SelectClient from './SelectClient.vue'
const store = useClientStore()
</script>
<template>
  <Teleport to="body">
    <div v-if="store.selectedClient === null && store.hasClients" class="backdrop">
      <div class="modal-outer rounded !bg-transparent">
        <div class="p-2">
          <!-- Title -->
          <SelectClient></SelectClient>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
