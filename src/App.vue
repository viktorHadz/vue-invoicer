<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './views/TheNavigation.vue'
import SelectClientMenu from './components/clients/SelectClient.vue'
import ItemsEditor from './components/ItemsEditor.vue'
import NoSelectedClientModal from './components/clients/NoSelectedClient.vue'
import { onMounted } from 'vue'
import { useClientStore } from '@/stores/clients'

const clients = useClientStore()
onMounted(() => {
  if (clients.selectedClient === null) {
    console.log('onMounted: Checking LS for client')
    console.log('onMounted: No selected client found')

    const storedValue = localStorage.getItem('selectedClient')

    if (storedValue !== null) {
      console.table('onMounted: Client found')

      clients.setClient(storedValue)
    } else {
      console.warn('onMounted: No client found. Select a client to continue')
    }
  }
})
</script>

<template>
  <header class="">
    <TheNavigation></TheNavigation>
  </header>
  <main>
    <RouterView class="main-view" />
    <div class="absolute top-0 right-0 mr-4 flex gap-8 w-full justify-around">
      <ItemsEditor> </ItemsEditor>
    </div>
    <div class="absolute top-0 right-0 mr-4 flex gap-8 px-4">
      <SelectClientMenu> </SelectClientMenu>
    </div>
    <NoSelectedClientModal></NoSelectedClientModal>
  </main>
</template>

<style scoped>
.main-view {
  width: 100%;
}
</style>
