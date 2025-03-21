<template>
  <button
    class="rounded-sm px-2 py-1 text-xs font-semibold ring-1 shadow-xs ring-inset bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
  },
}
</script>
