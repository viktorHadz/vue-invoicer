<template>
  <div class="relative">
    <label :for="props.id" class="input-label">
      {{ props.label }}
    </label>

    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="input"
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
