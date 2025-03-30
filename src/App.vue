<script setup>
import { RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
import SelectClient from './components/clients/SelectClient.vue'
import ItemsEditor from './components/items/ItemsEditor.vue'
import NoSelectedClientModal from './components/clients/NoSelectedClient.vue'
import { useClientStore } from '@/stores/clients'
import LeDarkMode from './components/UI/LeDarkMode.vue'

const clientStore = useClientStore()
</script>

<template>
  <div
    class="bg-primary text-fg flex min-h-[100vh] w-[100%] transition duration-500 will-change-transform"
  >
    <header>
      <nav class="navigation" v-if="clientStore.hasClients">
        <RouterLink to="/clients" class="link"> Clients </RouterLink>

        <RouterLink to="/invoice" class="link"> Invoice </RouterLink>

        <RouterLink to="/editor" class="link"> Editor</RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView class="mt-20" />
      <div
        v-if="clientStore.hasClients"
        class="absolute top-0 right-0 z-50 flex w-1/2 max-w-64 justify-end"
      >
        <div
          class="relative mr-4 flex gap-8 rounded-b-md border-x border-b border-neutral-400 p-2 dark:border-neutral-600"
        >
          <SelectClient selectTitle="Select a Client" select-title-class="text-sm"> </SelectClient>
          <ItemsEditor></ItemsEditor>
          <LeDarkMode></LeDarkMode>
        </div>
      </div>
      <!-- Modals -- Add parent component to decluter if needed  -->
      <NoSelectedClientModal></NoSelectedClientModal>
    </main>
  </div>
</template>

<style scoped></style>
