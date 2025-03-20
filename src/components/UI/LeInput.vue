<script setup>
import {  ref } from 'vue'
const props = defineProps({
  labelName: { type: String, required: true },
  inputPlaceholder: { type: String, required: false },
  inputName: { type: String, required: true },
  inputType: { type: String, required: true },
  autocompleteType: { type: String, required: false },
  modelValue: String,
})

const uniqueId = ref(`input-${Math.random().toString(36).slice(2, 11)}`)

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <label
      :for="uniqueId"
      class="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
      >{{ props.labelName }}</label
    >
    <input
      :id="uniqueId"
      :name="props.inputName"
      :type="props.inputType"
      :value="modelValue"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      :placeholder="props.inputPlaceholder"
      @input="emit('update:modelValue', $event.target.value)"
      :autocomplete="autocompleteType"
    />
  </div>
</template>
