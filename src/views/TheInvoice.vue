<script setup>
import { PrinterIcon } from '@heroicons/vue/24/outline'
import DatePick from '@/components/invoice/DatePick.vue'
import LeInput from '@/components/UI/LeInput.vue'
import { computed, ref } from 'vue'
import { ChevronUpDownIcon, QuestionMarkCircleIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Leslie Alexander' },
  { id: 1, name: 'Leslie Alexander' },
  { id: 1, name: 'Leslie Alexander' },
  { id: 1, name: 'Leslie Alexander' },
  { id: 1, name: 'Leslie Alexander' },
  { id: 1, name: 'Leslie Alexander' },
  { id: 2, name: 'Kakati Huq' },
  // More users...
]

const query = ref('')
const selectedPerson = ref(null)
const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.value.toLowerCase())
      }),
)
</script>

<template>
  <main class="px-20 py-16">
    <!-- Top 3 flex-box cols -->
    <div class="flex w-full cursor-default justify-between">
      <!-- Top Left -->
      <div class="flex flex-col gap-4">
        <div class="text-3xl font-bold">Invoice</div>
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
        <div class="text-3xl font-bold">To</div>

        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Client Name</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get client"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Company</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get client"></LeInput>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex w-28 justify-between">
            <p>Address</p>
            <p>:</p>
          </div>
          <LeInput placeholder="Get client"></LeInput>
        </div>
      </div>
    </div>
    <!-- Central Items Table -->
    <div class="mt-12 grid cursor-default grid-cols-8 items-baseline font-semibold">
      <div class="col-span-4 pb-2 text-3xl font-bold">Invoice Items</div>
      <div class="bold col-span-1">Quantity</div>
      <div class="bold col-span-1 truncate">
        Time <span class="text-xs font-normal">(min)</span>
      </div>
      <div class="bold col-span-1">Unit price</div>
      <div class="bold col-span-1">
        <div class="flex items-center justify-between" title="double click on an item to edit">
          <span class="">Item total</span>

          <QuestionMarkCircleIcon
            class="hover:text-acc relative z-20 size-5 cursor-pointer"
          ></QuestionMarkCircleIcon>
        </div>
      </div>
    </div>
    <hr />
    <!-- Item Selection -->
    <div class="grid grid-cols-8 items-baseline font-semibold">
      <!-- Combobox -->
      <Combobox
        as="div"
        v-model="selectedPerson"
        @update:modelValue="query = ''"
        class="col-span-4 pr-6"
      >
        <div class="relative mt-2">
          <ComboboxInput
            class="input block w-full py-1.5 pr-12 pl-3 text-base sm:text-sm/6"
            @change="query = $event.target.value"
            @blur="query = ''"
            :display-value="(person) => person?.name"
            placeholder="Click to search by item name"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden"
          >
            <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
          <ComboboxOptions
            v-if="filteredPeople.length > 0"
            class="input-dropdown absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-md focus:outline-hidden sm:text-sm"
          >
            <ComboboxOption
              v-for="person in filteredPeople"
              :key="person.id"
              :value="person"
              as="template"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  'hover:text-sec dark:hover:text-acc relative cursor-pointer py-2 pr-9 pl-3 select-none',
                  active
                    ? 'text-head bg-neutral-200/60 outline-hidden dark:bg-neutral-700/30'
                    : 'text-fg',
                ]"
              >
                <span
                  :class="['block truncate font-normal', selected && 'dark:text-acc font-semibold']"
                >
                  {{ person.name }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </Combobox>
      <!-- Numerics -->
      <LeInput class="col-span-1 pr-6" placeholder="e.g. x1"></LeInput>
      <LeInput class="col-span-1 pr-6" placeholder="minutes"></LeInput>
      <LeInput class="col-span-1 pr-6" placeholder="single"></LeInput>
      <LeInput class="col-span-1 pr-6" placeholder="total"></LeInput>
    </div>
    <!-- Items -->
    <div class="mt-4 grid grid-cols-8 items-baseline font-normal">
      <!-- loop items here -->
      <div class="col-span-4 pl-8 text-start">Blue Garfunkel</div>
      <div class="col-span-1 pr-8 text-end">x10</div>
      <div class="col-span-1 pr-8 text-end">60m</div>
      <div class="col-span-1 pr-8 text-end">£99.99</div>
      <div class="col-span-1 pr-8 text-end">£999.99</div>
    </div>
  </main>
</template>
