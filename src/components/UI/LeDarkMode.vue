<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode({
  attribute: 'data-theme',
  modes: {
    light: 'light',
    dark: 'dark',
  },
  disableTransition: false,
})
</script>
<template>
  <div>
    <div v-if="mode === 'light'">
      <p class="block text-sm font-medium tracking-tight">Light</p>
      <button class="cursor-pointer" @click="((mode = 'dark'), console.log(mode))">
        <SunIcon class="hover:text-acc size-8 stroke-1 transition-colors"></SunIcon>
      </button>
    </div>
    <div v-if="mode === 'dark'">
      <p class="block text-sm font-medium tracking-tight">Dark</p>
      <button class="cursor-pointer" @click="((mode = 'light'), console.log(mode))">
        <MoonIcon class="hover:text-acc size-8 stroke-1 transition-colors"></MoonIcon>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
