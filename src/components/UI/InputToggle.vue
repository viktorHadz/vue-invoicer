<script setup>
import { ref } from 'vue'
defineProps({
  id: String,
  plcholder: String,
})
const active = ref('left')
</script>
<template>
  <div class="relative">
    <span
      class="absolute right-1.5 -bottom-4 h-3.5 w-2 rounded-br-sm border-r border-b mask-t-from-0%"
    ></span>
    <input
      :id="id"
      :placeholder="plcholder"
      type="number"
      class="input hover:drop-shadow-acc/25 focus:drop-shadow-acc/25 text-base drop-shadow-md transition-shadow duration-75 sm:text-sm/6"
    />
    <div class="absolute -bottom-4 mx-auto flex w-full items-center justify-around px-2">
      <span
        class="bg-acc/20 absolute top-3 h-4 w-8.5 -translate-x-4.5 rounded transition-transform"
        :class="active === 'right' ? 'translate-x-4.5' : ''"
      ></span>
      <button class="relative top-2 left-1" @click="active = 'left'">
        <slot name="left"></slot>
      </button>
      <button class="relative top-2" @click="active = 'right'">
        <slot name="right"></slot>
      </button>
    </div>
    <span
      class="absolute -bottom-4 left-1.5 h-3.5 w-2 rounded-bl-sm border-b border-l mask-t-from-0"
    ></span>
  </div>
</template>
