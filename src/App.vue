<script setup>
import { RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
import SelectClient from './components/clients/SelectClient.vue'
import ItemsEditor from './components/items/ItemsEditor.vue'
import NoSelectedClientModal from './components/clients/NoSelectedClient.vue'
import { useClientStore } from '@/stores/clients'
import LeBtn from './components/UI/LeBtn.vue'
import LeDarkMode from './components/UI/LeDarkMode.vue'

const clientStore = useClientStore()
</script>

<template>
  <div class="layout bg-vbg text-fg border-vborder">
    <header class="sidebar border-vborder bg-vbg-head border-r">
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
        class="absolute top-0 right-0 z-50 flex w-1/2 max-w-64 justify-end"
      >
        <div
          class="border-vborder bg-vbg relative mr-4 flex gap-8 rounded-b-md border-x border-b p-2"
        >
          <SelectClient selectTitle="Select a Client" select-title-class="text-sm"> </SelectClient>
          <div class="flex flex-col">
            <ItemsEditor></ItemsEditor>
          </div>
          <LeDarkMode></LeDarkMode>
        </div>
      </div>
      <!-- Modals -- Add parent component to decluter if needed  -->
      <NoSelectedClientModal></NoSelectedClientModal>
    </main>
  </div>
</template>

<style scoped></style>
