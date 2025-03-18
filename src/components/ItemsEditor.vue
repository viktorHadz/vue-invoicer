<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
<template>
  <button @click="isOpen = true">Items</button>

  <Teleport to="body">
    <div v-if="isOpen" class="backdrop">
      <div class="slide-over">
        <div class="modal-inner">
          <p>Hello from the modal!</p>
          <button @click="isOpen = false">Close</button>
        </div>
      </div>
    </div>
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
</style>
