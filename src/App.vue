<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './views/TheNavigation.vue'
import SelectClientMenu from './components/SelectClient.vue'
import ItemsEditor from './components/ItemsEditor.vue'
import ModalGlob from './components/ModalGlob.vue'

import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <header>
    <aside>
      <TheNavigation></TheNavigation>
    </aside>
  </header>
  <main>
    <RouterView class="main-view" />
    <SelectClientMenu id="main-client-select"> </SelectClientMenu>
    <ItemsEditor> </ItemsEditor>
    <ModalGlob @open-modal="isOpen = true" />
  </main>
</template>

<style scoped>
.main-view {
  width: 100%;
}
</style>
