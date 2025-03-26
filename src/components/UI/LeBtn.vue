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
    class="cursor-pointer rounded-sm bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
    :class="{ 'cursor-not-allowed opacity-70': disabled }"
  >
    {{ buttonText }}
    <slot></slot>
  </button>
</template>
