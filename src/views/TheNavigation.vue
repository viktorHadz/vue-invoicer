<script setup>
import { RouterLink } from 'vue-router'
import LeBtn from '@/components/UI/LeBtn.vue'
</script>
<template>
  <nav class="flex flex-col gap-4">
    <RouterLink to="/clients"
      ><LeBtn type="button" button-text="Clients">Clients</LeBtn></RouterLink
    >
    <RouterLink to="/invoice"
      ><LeBtn type="button" button-text="Invoice">Invoice</LeBtn></RouterLink
    >
    <RouterLink to="/editor"><LeBtn type="button" button-text="Editor">Editor</LeBtn></RouterLink>
  </nav>
</template>
