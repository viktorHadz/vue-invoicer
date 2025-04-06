<template>
  <fieldset>
    <RadioGroup
      v-model="itemType"
      class="grid grid-cols-2 gap-x-1 rounded-md text-center text-xs font-semibold"
    >
      <RadioGroupOption
        as="template"
        v-for="option in frequencies"
        :key="option.value"
        :value="option"
        v-slot="{ checked }"
      >
        <div>
          <div
            :class="[
              checked ? '' : 'translate-x-full',
              'z-0 h-4 w-4 rounded-full p-4 transition-transform duration-500',
            ]"
          >
            s
          </div>
          <div
            :class="[
              checked ? 'text-acc' : 'text-fg hover:text-sec dark:hover:text-white',
              'z-10 cursor-pointer rounded px-2.5 py-1.5',
            ]"
          >
            {{ option.value }}
          </div>
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'

const frequencies = [{ value: 'style' }, { value: 'sample' }]

const itemType = ref(frequencies[0])
</script>
