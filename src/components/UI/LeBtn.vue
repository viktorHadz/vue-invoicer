<script setup>
defineProps({
  buttonText: String,
  type: String,
  disabled: Boolean,
})
</script>
<template>
  <button
    :disabled="disabled"
    class="rounded-sm px-2 py-1 text-xs font-semibold ring-1 shadow-xs ring-inset bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 cursor-pointer"
    :class="{ 'opacity-70 cursor-not-allowed': disabled }"
  >
    {{ buttonText }}
    <slot></slot>
  </button>
</template>
