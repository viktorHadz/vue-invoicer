<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './views/TheNavigation.vue'
import SelectClientMenu from './components/SelectClient.vue'
import ItemsEditor from './components/ItemsEditor.vue'
import ModalCenter from './components/ModalCenter.vue'
</script>

<template>
  <header>
    <aside>
      <TheNavigation></TheNavigation>
    </aside>
  </header>
  <main>
    <RouterView class="main-view" />

    <SelectClientMenu> </SelectClientMenu>
    <ItemsEditor> </ItemsEditor>
    <ModalCenter btnTxt="Modal Global" title="Modal Title Baby" closeTxt="ok" />
  </main>
</template>

<style scoped>
.main-view {
  width: 100%;
}
</style>
