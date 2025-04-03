<script setup>
import { PrinterIcon } from '@heroicons/vue/24/outline'
import DatePick from '@/components/invoice/DatePick.vue'
import LeInput from '@/components/UI/LeInput.vue'
</script>

<template>
  <main class="px-20 py-16">
    <!-- Top 3 flex-box cols -->
    <div class="pb-2 text-3xl font-bold">Invoice</div>
    <div class="flex w-full justify-between">
      <!-- Top Left -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Invoice No</p>
            <p>:</p>
          </div>
          <LeInput placeholder="#S.A.M-1"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Created Date</p>
            <p>:</p>
          </div>
          <LeInput placeholder="22/04/2025"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Due Date</p>
            <p>:</p>
          </div>
          <div class="flex flex-col">
            <DatePick></DatePick>
          </div>
        </div>
      </div>
      <!-- Center icons -->
      <div>
        <button class="hover:text-acc cursor-pointer" title="create PDF">
          <PrinterIcon class="size-7"></PrinterIcon>
        </button>
      </div>
      <!-- Top Right -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Client Name</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get clients"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Company</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get clients"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Address</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get clients"></LeInput>
        </div>
      </div>
    </div>
    <!-- Central Items Table -->
    <div class="mt-16 flex w-full items-baseline justify-between">
      <div class="pb-2 text-3xl font-bold">Invoice Items</div>
      <div class="divide divide divide-acc flex gap-8 divide-x-3 font-semibold">
        <div>Quantity</div>
        <div>Time (minutes)</div>
        <div>Unit price</div>
        <div>Item total</div>
      </div>
    </div>
    <hr />
  </main>
</template>
