<template>
  <div class="relative">
    <label
      :for="props.id"
      class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
    >
      {{ props.label }}
    </label>

    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="block w-full rounded-md font-normal bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
