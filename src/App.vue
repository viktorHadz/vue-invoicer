<script setup>
import { RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
import SelectClient from './components/clients/SelectClient.vue'
import ItemsEditor from './components/items/ItemsEditor.vue'
import NoSelectedClientModal from './components/clients/NoSelectedClient.vue'
import { useClientStore } from '@/stores/clients'
import LeBtn from './components/UI/LeBtn.vue'

const clientStore = useClientStore()

// If memorised in localstorage
</script>

<template>
  <div class="layout">
    <header class="sidebar border-r border-gray-300 bg-gray-100/75">
      <nav class="flex flex-col gap-4 p-4" v-if="clientStore.hasClients">
        <RouterLink to="/clients">
          <LeBtn type="button" button-text="Clients">Clients</LeBtn>
        </RouterLink>

        <RouterLink to="/invoice">
          <LeBtn type="button" button-text="Invoice">Invoice</LeBtn>
        </RouterLink>

        <RouterLink to="/editor">
          <LeBtn type="button" button-text="Editor">Editor</LeBtn>
        </RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView class="mt-20" />
      <div
        v-if="clientStore.hasClients"
        class="absolute top-0 right-0 z-50 max-w-64 w-1/2 flex justify-end"
      >
        <div
          class="relative border-b border-x rounded-b-md bg-gray-100/75 border-gray-300 flex gap-8 p-2 mr-4"
        >
          <SelectClient selectTitle="Select a Client" select-title-class="text-sm"> </SelectClient>
          <div class="flex flex-col">
            <ItemsEditor></ItemsEditor>
          </div>
        </div>
      </div>
      <!-- Modals -- Add parent component to decluter if needed  -->
      <NoSelectedClientModal></NoSelectedClientModal>
    </main>
  </div>
</template>

<style scoped></style>
