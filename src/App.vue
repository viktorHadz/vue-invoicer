<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './views/TheNavigation.vue'
import SelectClientMenu from './components/clients/SelectClient.vue'
import ItemsEditor from './components/ItemsEditor.vue'
import ModalCenter from './components/ModalCenter.vue'
</script>

<template>
  <header class="">
    <TheNavigation></TheNavigation>
  </header>
  <main>
    <RouterView class="main-view" />
    <div class="absolute top-0 right-0 mr-4 flex gap-8">
      <SelectClientMenu> </SelectClientMenu>
      <ItemsEditor> </ItemsEditor>
    </div>
    <ModalCenter btnTxt="Modal Global" title="Modal Title Baby" closeTxt="ok" />
  </main>
</template>

<style scoped>
.main-view {
  width: 100%;
}
</style>
