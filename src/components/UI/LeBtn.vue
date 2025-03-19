<template>
  <button :type="type" :class="computedClasses" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'default', // Variants for different button styles
    },
  },
  computed: {
    computedClasses() {
      // Need to use classes like primary for colors here which are set up in the @theme for both light and dark
      const baseClasses = 'rounded-sm px-2 py-1 text-xs font-semibold ring-1 shadow-xs ring-inset'
      const variants = {
        default: 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50',
        primary: 'bg-blue-600 text-white ring-blue-600 hover:bg-blue-700',
        danger: 'bg-red-600 text-white ring-red-600 hover:bg-red-700',
      }
      return `${baseClasses} ${variants[this.variant] || variants.default}`
    },
  },
}
</script>
