<script setup>
import { RouterLink } from 'vue-router'
import LeBtn from '@/components/UI/LeBtn.vue'
</script>
<template>
  <nav class="flex flex-col gap-4">
    <RouterLink to="/clients"><LeBtn type="button">Clients</LeBtn></RouterLink>
    <RouterLink to="/invoice"><LeBtn type="button">Invoice</LeBtn></RouterLink>
    <RouterLink to="/editor"><LeBtn type="button">Editor</LeBtn></RouterLink>
  </nav>
</template>
