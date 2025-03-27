<template>
  <div class="relative">
    <label
      :for="props.id"
      class="absolute -top-2 left-2 inline-block rounded-lg px-1 text-xs font-medium text-neutral-800"
    >
      {{ props.label }}
    </label>

    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="block w-full rounded-md bg-neutral-100 px-3 py-1.5 text-base font-normal text-neutral-900 outline-1 -outline-offset-1 outline-neutral-400 placeholder:text-neutral-700 hover:bg-neutral-50 hover:outline-neutral-600 focus:bg-neutral-50 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-600 sm:text-sm/6 dark:bg-zinc-900 dark:text-neutral-400 dark:outline-neutral-600 dark:placeholder:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:outline-neutral-600 dark:focus:bg-neutral-900"
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
