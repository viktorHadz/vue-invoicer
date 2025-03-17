<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <aside>
      <RouterLink to="/clients"><button type="button">Clients</button></RouterLink>
      <RouterLink to="/items"><button type="button">Items</button></RouterLink>
      <RouterLink to="/invoice"><button type="button">Invoice</button></RouterLink>
      <RouterLink to="/editor"><button type="button">Editor</button></RouterLink>
    </aside>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
