<script setup>
import InvoiceTo from '@/components/invoice/InvoiceTo.vue'
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
const active = ref('')
</script>

<template>
  <main
    class="px-20 py-18 2xl:mx-auto 2xl:flex 2xl:max-w-[70%] 2xl:flex-col 2xl:items-center 2xl:px-40"
  >
    <!-- Top 3 flex-box cols -->
    <InvoiceTo></InvoiceTo>
    <!-- Invoice Items -->
    <div class="mt-12 grid w-full cursor-default grid-cols-8 items-baseline font-semibold">
      <div class="col-span-8 grid grid-cols-subgrid items-baseline">
        <div class="col-span-4 text-3xl font-bold">
          <div class="flex w-full items-end justify-between">
            <h1 class="">Invoice Items</h1>
          </div>
        </div>

        <div class="col-span-1">Quantity</div>
        <div class="col-span-1 truncate">Time <span class="text-xs font-normal">(min)</span></div>
        <div class="col-span-1">Unit price</div>
        <div class="col-span-1">
          <div class="flex items-center justify-between" title="double click on an item to edit">
            <span class="">Item total</span>

            <QuestionMarkCircleIcon
              class="hover:text-acc relative z-20 size-5 cursor-pointer"
            ></QuestionMarkCircleIcon>
          </div>
        </div>
      </div>
      <hr class="text-fg/50 col-span-8 mt-1 mb-2" />

      <div class="col-span-8 grid grid-cols-subgrid items-center pt-5">
        <!-- Item Select Inputs  -->
        <Combobox
          as="div"
          v-model="selectedPerson"
          @update:modelValue="query = ''"
          class="col-span-4 pr-6"
        >
          <div class="relative">
            <div class="absolute -top-6 z-10 w-full text-sm">
              <div class="relative flex h-7 w-[8rem] items-center justify-between text-sm">
                <span
                  class="bg-sec dark:bg-acc/20 absolute bottom-1.5 left-0 h-4 w-1/2 rounded transition-transform duration-300"
                  :class="active === 'style' ? 'translate-x-0' : 'translate-x-full'"
                ></span>
                <button
                  @click="active = 'style'"
                  :class="
                    active === 'style'
                      ? 'dark:text-acc'
                      : 'text-fg hover:text-sec cursor-pointer dark:hover:text-white'
                  "
                  class="z-10 w-1/2"
                >
                  style
                </button>
                <button
                  @click="active = 'sample'"
                  :class="
                    active === 'sample'
                      ? 'dark:text-acc'
                      : 'text-fg hover:text-sec cursor-pointer dark:hover:text-white'
                  "
                  class="z-10 w-1/2"
                >
                  sample
                </button>
              </div>
            </div>
            <ComboboxInput
              class="input block w-full py-1 pr-12 pl-3 text-base sm:text-sm/6"
              @change="query = $event.target.value"
              @blur="query = ''"
              :display-value="(person) => person?.name"
              :placeholder="`Click to search by ${active} name`"
            />
            <ComboboxButton
              class="absolute inset-y-0 top-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden"
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
                    :class="[
                      'block truncate font-normal',
                      selected && 'dark:text-acc font-semibold',
                    ]"
                  >
                    {{ person.name }}
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </Combobox>
        <!-- Numerics -->
        <LeInput class="col-span-1 pr-5" placeholder="e.g. x1"></LeInput>
        <LeInput class="col-span-1 pr-5" placeholder="minutes"></LeInput>
        <LeInput class="col-span-1 pr-5" placeholder="single"></LeInput>
        <LeInput class="col-span-1 pr-5" placeholder="total"></LeInput>
      </div>
      <!-- Items -->
      <div class="col-span-8 mt-2 grid grid-cols-subgrid items-center text-base font-normal">
        <!-- loop items here -->
        <div class="col-span-4 pl-8 text-start">Blue Garfunkel</div>
        <div class="col-span-1 pr-8 text-end">x10</div>
        <div class="col-span-1 pr-8 text-end">60m</div>
        <div class="col-span-1 pr-8 text-end">£99.99</div>
        <div class="col-span-1 pr-8 text-end">£999.99</div>
      </div>
      <!-- Totals -->
      <div
        class="pointer-events-none col-span-8 mt-2 grid grid-cols-subgrid items-center text-lg font-normal"
      >
        <!-- border -->
        <!-- <div class="col-start-6 col-end-9 row-start-1 row-end-6 h-full rounded-md border"></div> -->
        <!-- horizontal line -->
        <div
          class="border-fg/50 col-span-3 col-start-6 row-start-1 h-full items-end border-b"
        ></div>
        <!-- vertical line-->
        <div class="border-fg/50 col-start-6 row-start-1 row-end-6 h-full border-r"></div>
        <!-- Text -->
        <div class="col-span-1 col-start-6 row-start-1 mr-3 text-end">Subtotal</div>
        <div class="col-span-1 col-start-6 row-start-2 mr-3 text-end">Discount</div>
        <div class="col-span-1 col-start-6 row-start-3 mr-3 text-end">VAT</div>
        <div class="col-span-1 col-start-6 row-start-4 mr-3 text-end">Total</div>
        <div class="col-span-1 col-start-6 row-start-5 mr-3 text-end">Deposit</div>
        <!-- Value -->
        <div class="col-span-2 col-start-7 row-start-1 mr-2 text-end">£256 000.00</div>
        <div class="col-span-2 col-start-7 row-start-2 mr-2 text-end">50% (£128 000.00)</div>
        <div class="col-span-2 col-start-7 row-start-3 mr-2 text-end">£25600</div>
        <div class="col-span-2 col-start-7 row-start-4 mr-2 text-end">£153 600.00</div>
        <div class="col-span-2 col-start-7 row-start-5 mr-2 text-end">40% (£61 440)</div>
      </div>
    </div>
  </main>
</template>
