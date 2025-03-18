<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './views/TheNavigation.vue'
import SelectClientMenu from './components/SelectClient.vue'
import ItemsEditor from './components/ItemsEditor.vue'
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
    <ItemsEditor>
      <button>Items</button>
    </ItemsEditor>
  </main>
</template>

<style scoped>
.main-view {
  width: 100%;
}
</style>
