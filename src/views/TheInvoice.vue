<script setup>
import InvoiceTo from '@/components/invoice/InvoiceTo.vue'
import LeInput from '@/components/UI/LeInput.vue'
import { computed, ref, reactive } from 'vue'
import {
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/vue'
import { useItemsStore } from '@/stores/items'
import LeBtn from '@/components/UI/LeBtn.vue'

const itemStore = useItemsStore()

// const searchQueries = ref('')
const searchQueries = reactive({
  style: '',
  sample: '',
})
const itemForm = reactive({
  id: '',
  name: '',
  type: '',
  time: 0,
  qty: 1,
  price: 0,
  itemTotal: 0,
})

// const filteredItems = computed(() =>
//   query.value === ''
//     ? people
//     : people.filter((person) => {
//         return person.name.toLowerCase().includes(query.value.toLowerCase())
//       }),
// )
const itemType = ref('style')
const filteredItems = computed(() => {
  return itemStore.items[itemType.value].filter((item) =>
    item.name.toLowerCase().includes(searchQueries[itemType.value].toLowerCase()),
  )
})
// const addItemToInvo = (item) => {
//   Object.assign(itemForm, item)
// }
const addItemToForm = (item) => {
  Object.assign(itemForm, item)
  console.log(itemForm)
}
const resetInputs = (formName) => {
  formName.id = ''
  formName.name = ''
  formName.type = itemType.value
  formName.time = 0
  formName.qty = 1
  formName.price = 0
  formName.itemTotal = 0
}
/*
1. Have to loop over items based on selectedEl.value - DONE

*/
</script>

<template>
  <main
    class="px-20 py-18 2xl:mx-auto 2xl:flex 2xl:max-w-[70%] 2xl:flex-col 2xl:items-center 2xl:px-40"
  >
    <LeBtn @click="console.log('Item: ', itemType, 'selectedItem: ', itemForm)">log</LeBtn>
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
      <div class="relative col-span-9 grid grid-cols-subgrid items-center pt-5">
        <Popover v-slot="{ open }" class="col-span-4">
          <PopoverButton
            :class="open ? 'text-white' : 'text-white/90'"
            class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            <LeBtn class="flex items-center gap-2">
              Add
              <ChevronDownIcon
                :class="open ? 'text-acc' : 'text-acc/70'"
                class="group-hover:acc/80 size-4 transition duration-150 ease-in-out"
                aria-hidden="true"
              />
            </LeBtn>
          </PopoverButton>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel class="absolute right-0 left-0 z-50 ml-3 max-w-md focus:outline-none">
              <div class="ring-brdr overflow-hidden rounded-lg ring-1">
                <div class="bg-primary">
                  <div
                    v-if="filteredItems.length > 0"
                    class="max-h-60 w-full overflow-auto rounded-md text-base focus:outline-hidden sm:text-sm"
                  >
                    <div class="border-brdr sticky top-0 h-12 w-full border-b bg-amber-200">
                      <p class="text-2xl">Hello my friends</p>
                    </div>
                    <div
                      v-for="item in filteredItems"
                      :key="item.id"
                      :value="item"
                      class="my-2 grid grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-2"
                    >
                      <div class="">{{ item.name }}</div>
                      <LeBtn class="text-xs" title="Select to edit item">select</LeBtn>
                      <input class="input h-6.5 max-w-8" v-model="itemForm.qty" />
                      <LeBtn class="text-xs">add</LeBtn>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
      <div class="col-span-9 grid grid-cols-subgrid items-center pt-5">
        <!-- Item Select Inputs  -->
        <Combobox
          as="div"
          v-model="itemForm"
          @update:modelValue="searchQueries[itemType] = ''"
          class="col-span-4 pr-6"
        >
          <div class="relative">
            <!-- Style/Sample Toggle -->
            <div class="absolute -top-6 z-10 w-full text-sm">
              <div class="relative flex h-7 w-[8rem] items-center justify-between text-sm">
                <!-- animated handel -->
                <span
                  class="bg-acc dark:bg-acc/20 absolute bottom-1.5 left-0 h-4 w-1/2 rounded transition-transform duration-300"
                  :class="itemType === 'style' ? 'translate-x-0' : 'translate-x-full'"
                ></span>
                <button
                  @click="itemType = 'style'"
                  :class="
                    itemType === 'style'
                      ? 'text-fg2 dark:text-acc'
                      : 'text-fg hover:text-acc cursor-pointer dark:hover:text-white'
                  "
                  class="z-10 w-1/2"
                >
                  style
                </button>
                <button
                  @click="itemType = 'sample'"
                  :class="
                    itemType === 'sample'
                      ? 'text-fg2 dark:text-acc'
                      : 'text-fg hover:text-acc cursor-pointer dark:hover:text-white'
                  "
                  class="z-10 w-1/2"
                >
                  sample
                </button>
              </div>
            </div>
            <ComboboxInput
              :id="'invo-item-name-combo-1'"
              class="input block w-full py-1 pr-12 pl-3 text-base sm:text-sm/6"
              @change="searchQueries[itemType] = $event.target.value"
              :placeholder="`Click to search by ${itemType} name`"
            />
            <ComboboxButton
              class="absolute inset-y-0 top-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden"
            >
              <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
            <ComboboxOptions
              v-if="filteredItems.length > 0"
              class="input-dropdown absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-md focus:outline-hidden sm:text-sm"
            >
              <ComboboxOption
                v-for="item in filteredItems"
                :key="item.id"
                :value="item"
                as="template"
              >
                <li
                  class="hover:text-acc dark:hover:text-acc relative py-2 pr-4 pl-3 font-normal select-none"
                >
                  <div
                    class="grid w-full grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2"
                  >
                    <div class="truncate">{{ item.name }}</div>
                    <div class="truncate">{{ item.price }}</div>
                  </div>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        </Combobox>
        <!-- Numerics -->
        <LeInput
          class="col-span-1 pr-5"
          placeholder="e.g. x1"
          v-model="itemForm.qty"
          :id="'invo-qty-1'"
          :type="'number'"
        ></LeInput>
        <LeInput
          class="col-span-1 pr-5"
          v-model="itemForm.time"
          :id="'invo-time-1'"
          :type="'number'"
        ></LeInput>
        <LeInput
          class="col-span-1 pr-5"
          v-model="itemForm.price"
          :id="'invo-price-1'"
          :type="'number'"
        ></LeInput>
        <div class="col-span-1 pr-5" v-html="itemForm.itemTotal"></div>
        <div>s</div>
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
