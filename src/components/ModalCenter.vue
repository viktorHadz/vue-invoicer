<script setup>
import { ref } from 'vue'
const props = defineProps({
  btnTxt: { type: String, required: true },
  title: { type: String, required: false },
  closeTxt: { type: String, required: true },
})
const isOpen = ref(false)
</script>
<template>
  <button @click="isOpen = true">{{ props.btnTxt }}</button>

  <Teleport to="body">
    <div v-if="isOpen" class="backdrop">
      <div class="modal-outer">
        <div class="modal-inner">
          <h3>{{ props.title }}</h3>

          <slot></slot>
          <button @click="isOpen = false">{{ props.closeTxt }}</button>
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
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
/* Maybe pass the W and H as props? So user can control externally?  */
.modal-outer {
  z-index: 991;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(15rem, 32vw, 20rem);
  height: clamp(10rem, 16vh, 20vh);
  background-color: white;
}
</style>
