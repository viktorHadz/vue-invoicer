<script setup>
import { ref } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/outline'
import { useItemsStore } from '@/stores/items'

const itemStore = useItemsStore()
const styles = ref(itemStore.fakeItems)
const stySrchItems = ref('')

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
    <p class="block font-medium tracking-tight text-sm text-gray-900">Items</p>

    <!-- Icon that changes color on hover -->
    <BriefcaseIcon
      @click="isOpen = true"
      class="size-8 stroke-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
    ></BriefcaseIcon>
  </div>

  <Teleport to="body">
    <transition name="fadeItIn">
      <div v-if="isOpen" class="backdrop"></div>
    </transition>

    <transition mode="out-in" name="slideItIn">
      <div class="slide-over" v-if="isOpen">
        <div class="modal-inner">
          <p>Hello from the modal!</p>
          <button @click="console.log(styles)">sssssssssss</button>
          <button @click="isOpen = false">Close</button>

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
.backdrop {
  z-index: 900;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
}
.slide-over {
  z-index: 901;
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  background-color: white;
}

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
