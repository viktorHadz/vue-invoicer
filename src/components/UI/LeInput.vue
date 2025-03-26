<template>
  <div class="relative">
    <label
      :for="props.id"
      class="text-fg absolute -top-2 left-2 inline-block rounded-lg px-1 text-xs font-medium"
    >
      {{ props.label }}
    </label>

    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="bg-vbg-head2 focus:bg-vbg-head hover:bg-vbg-head outline-vborder hover:outline-fg/50 placeholder:text-fg hover:placeholder:text-fg-2 focus:outline-fg text-fg2 block w-full rounded-md px-3 py-1.5 text-base font-normal outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  name: String,
  modelValue: [String, Number],
  labelHidden: Boolean,
})

const emit = defineEmits(['update:modelValue'])
</script>
