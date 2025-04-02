<script setup>
import { PrinterIcon } from '@heroicons/vue/24/outline'
import DatePick from '@/components/invoice/DatePick.vue'
// import LeInput from '@/components/UI/LeInput.vue'
</script>

<template>
  <main class="px-20 py-10">
    <div class="flex items-center gap-20">
      <div class="text-3xl font-bold">Invoice</div>
      <button class="hover:text-acc cursor-pointer" title="create PDF">
        <PrinterIcon class="size-7"></PrinterIcon>
      </button>
    </div>
    <div class="flex w-full justify-between">
      <!-- Top Left -->
      <div class="flex gap-12">
        <div class="flex flex-col">
          <p>Invoice No:</p>
          <p>Created Date:</p>
          <p>Due Date:</p>
        </div>
        <div class="flex flex-col">
          <p>#S.A.M-1</p>
          <p>22/04/2025</p>
          <DatePick></DatePick>
        </div>
      </div>
      <!-- Top Right -->
      <div class="flex gap-12">
        <div class="flex flex-col">
          <p>Invoice No:</p>
          <p>Created Date:</p>
          <p>Due Date:</p>
        </div>
        <div class="flex flex-col">
          <p>#S.A.M-1</p>
          <p>22/04/2025</p>
          <DatePick></DatePick>
        </div>
      </div>
    </div>
  </main>
</template>
