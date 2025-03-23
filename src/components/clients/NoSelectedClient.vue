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
          <SelectClient
            select-title="No client selected"
            select-title-class="text-white text-lg"
          ></SelectClient>
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
