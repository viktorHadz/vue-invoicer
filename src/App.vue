<script setup>
import { RouterView } from 'vue-router'
import { RouterLink } from 'vue-router'
import SelectClient from './components/clients/SelectClient.vue'
import ItemsEditor from './components/items/ItemsEditor.vue'
import NoSelectedClientModal from './components/clients/NoSelectedClient.vue'
import { useClientStore } from '@/stores/clients'
import LeDarkMode from './components/UI/LeDarkMode.vue'
import NavBtn from './components/UI/NavBtn.vue'
const clientStore = useClientStore()
</script>

<template>
  <div
    class="layout bg-white text-neutral-700 transition duration-500 dark:bg-neutral-800 dark:text-neutral-400"
  >
    <header
      class="sidebar border-r border-neutral-400 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <nav class="flex flex-col gap-4 p-4" v-if="clientStore.hasClients">
        <RouterLink to="/clients">
          <NavBtn href="#" button-text="Clients" class=""></NavBtn>
        </RouterLink>

        <RouterLink to="/invoice">
          <NavBtn type="button" button-text="Invoice"></NavBtn>
        </RouterLink>

        <RouterLink to="/editor">
          <NavBtn type="button" button-text="Editor"></NavBtn>
        </RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView class="mt-20" />
      <div
        v-if="clientStore.hasClients"
        class="absolute top-0 right-0 z-50 flex w-1/2 max-w-64 justify-end"
      >
        <div class="relative mr-4 flex gap-8 rounded-b-md border-x border-b p-2">
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
