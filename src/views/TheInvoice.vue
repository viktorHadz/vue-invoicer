<script setup>
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { PrinterIcon, CalendarIcon } from '@heroicons/vue/24/outline'
// import LeInput from '@/components/UI/LeInput.vue'

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
  <main class="px-20 py-10">
    <div class="flex items-center gap-20">
      <div class="text-3xl font-bold">Invoice</div>
      <button class="hover:text-acc cursor-pointer" title="create PDF">
        <PrinterIcon class="size-7"></PrinterIcon>
      </button>
    </div>
    <div class="flex gap-12">
      <div class="flex flex-col">
        <p>Invoice No:</p>
        <p>Created Date:</p>
        <p>Due Date:</p>
      </div>
      <div class="flex flex-col">
        <p>#S.A.M-1</p>
        <p>22/04/2025</p>

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
      </div>
    </div>
    <div></div>
  </main>
</template>
