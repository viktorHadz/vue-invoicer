<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useStorage } from '@vueuse/core'
import { onMounted, watch } from 'vue'

onMounted(() => {
  const app = document.getElementById('app')
  if (darkModeOn.value) {
    app.classList.add('dark')
  } else {
    app.classList.remove('dark')
  }
})

const darkModeOn = useStorage('darkModeOn', false)

function toggleDarkMode() {
  darkModeOn.value = !darkModeOn.value
  console.log('darkModeOn?: ', darkModeOn.value)

  let app = document.getElementById('app')

  app.classList.toggle('dark')
}

watch(darkModeOn, () => {
  const app = document.getElementById('app')
  darkModeOn.value === true ? app.classList.add('dark') : app.classList.remove('dark')
})
</script>
<template>
  <div>
    <div v-if="!darkModeOn">
      <p class="block font-medium tracking-tight text-sm text-gray-900">Light</p>
      <button class="cursor-pointer" @click="toggleDarkMode">
        <SunIcon
          class="size-8 stroke-1 text-gray-600 hover:text-gray-900 transition-colors"
        ></SunIcon>
      </button>
    </div>
    <div v-if="darkModeOn">
      <p class="block font-medium tracking-tight text-sm text-gray-900">Dark</p>
      <button class="cursor-pointer" @click="toggleDarkMode">
        <MoonIcon
          class="size-8 stroke-1 text-gray-600 hover:text-gray-900 transition-colors"
        ></MoonIcon>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
