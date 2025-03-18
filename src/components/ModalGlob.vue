<script setup>
import { ref } from 'vue'
const emit = defineEmits('open-modal')
const isOpen = ref(false)
function openModal() {
  emit('open-modal')
  isOpen.value = true
}
</script>
<template>
  <button @click="openModal()">Click Me</button>

  <Teleport to="body">
    <div v-if="isOpen" class="backdrop">
      <div class="modal-outer">
        <div class="modal-inner">
          <p>Gob Modal!</p>
          <button @click="isOpen = false">OK</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.backdrop {
  z-index: 990;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
}
/* Maybe pass the W and H as props? So user can control externally?  */
.modal-outer {
  z-index: 991;
  position: fixed;
  top: 0;
  right: 0;
  margin: 50%;
  width: 25vw;
  height: 25vh;
  background-color: white;
}
</style>
