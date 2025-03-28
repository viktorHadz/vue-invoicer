<script setup>
import { ref } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/outline'
import { useItemsStore } from '@/stores/items'

const itemStore = useItemsStore()
const styles = ref(itemStore.fakeItems)
// const stySrchItems = ref('')

// const displayStyles = computed(() => {
//   return styles.value.filter((style) => {
//     return style.title.trim().toLowerCase().includes(stySrchItems.value.toLowerCase())
//   })
// })
const isOpen = ref(false)
</script>
<template>
  <div class="flex flex-col items-center">
    <!-- Text that always stays gray-900 -->
    <p class="block text-sm font-medium tracking-tight">Items</p>

    <!-- Icon that changes color on hover -->
    <BriefcaseIcon
      @click="isOpen = true"
      class="hover:text-acc size-8 cursor-pointer stroke-1 transition-colors"
    ></BriefcaseIcon>
  </div>

  <Teleport to="body">
    <transition name="fadeItIn">
      <div
        v-if="isOpen"
        class="fixed inset-0 top-0 right-0 z-[900] h-[100vh] w-[100vw] bg-black/50 select-none"
      ></div>
    </transition>

    <transition mode="out-in" name="slideItIn">
      <div
        class="fixed top-0 right-0 z-[901] h-[100vh] w-[50vw] bg-white 2xl:w-1/3 dark:bg-neutral-800"
        v-if="isOpen"
      >
        <div class="back-of-modal">
          <p>Hello from the modal!</p>
          <button @click="console.log(styles)">ss</button>
          <button @click="isOpen = false" class="bg-acc p-4">Close</button>

          <!-- <ul v-for="style in displayStyles" :key="style.id">
            <li>{{ style.title }}</li>
            <li>{{ style.category }}</li>
            <li>{{ style.price }}</li>
          </ul> -->
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<style scoped>
@reference '@/assets/main.css';

.fadeItIn-enter-active,
.fadeItIn-leave-active {
  transition: opacity 0.3s ease;
}

.fadeItIn-enter-from,
.fadeItIn-leave-to {
  opacity: 0;
}
.slideItIn-enter-to,
.slideItIn-leave-from {
  opacity: 1;
}

.slideItIn-enter-active,
.slideItIn-leave-active {
  transition: transform 0.5s ease;
}
.slideItIn-enter-from,
.slideItIn-leave-to {
  transform: translateX(100%);
}
.slideItIn-enter-to,
.slideItIn-leave-from {
  transform: translateX(0);
}
</style>
