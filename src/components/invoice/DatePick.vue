<script setup>
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { CalendarIcon } from '@heroicons/vue/24/outline'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(new Date())

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const dueDate = computed({
  get: () => date.value,
  set: (val) => {
    date.value = new Date(val)
  },
})

const mode = useStorage('vueuse-color-scheme')
const datePickerMode = computed(() => {
  return mode.value === 'dark' ? true : false
})
</script>
<template>
  <VueDatePicker v-model="dueDate" :enable-time-picker="false" :dark="datePickerMode">
    <template #trigger>
      <div class="text-fg hover:text-acc flex cursor-pointer items-center gap-2">
        <CalendarIcon class="size-4"></CalendarIcon>
        <p class="max-w-20 truncate text-sm/relaxed">
          {{ formatter.format(dueDate) || 'Select due date' }}
        </p>
      </div>
    </template>
  </VueDatePicker>
</template>
