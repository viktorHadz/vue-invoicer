<script setup>
import InvoiceTo from '@/components/invoice/InvoiceTo.vue'
import LeInput from '@/components/UI/LeInput.vue'
import { computed, ref, reactive } from 'vue'
import { ChevronUpDownIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { useItemsStore } from '@/stores/items'
import LeBtn from '@/components/UI/LeBtn.vue'

const itemStore = useItemsStore()

const searchQueries = reactive({
  style: '',
  sample: '',
})
const itemForm = reactive({
  id: '',
  name: '',
  type: '',
  time: 1,
  qty: 1,
  price: 0,
  itemTotal: 0,
})

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
  console.log(item)
  // mutate item dependent on itemType
  const newItem = { ...item, itemTotal: item.time * item.price }
  Object.assign(itemForm, newItem)

  console.log(itemForm)
}

// const resetInputs = (formName) => {
//   formName.id = ''
//   formName.name = ''
//   formName.type = itemType.value
//   formName.time = 0
//   formName.qty = 1
//   formName.price = 0
//   formName.itemTotal = 0
// }
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
      <div class="col-span-8 grid grid-cols-subgrid items-baseline gap-6">
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
      <!-- Item Select Inputs  -->
      <Combobox
        as="div"
        @update:modelValue="searchQueries[itemType] = ''"
        v-model="itemForm"
        class="relative col-span-8 grid grid-cols-subgrid items-center gap-6 pt-5"
      >
        <!-- Style/Sample Toggle -->
        <div class="absolute -top-1 w-full max-w-36">
          <!-- animated handle -->
          <div class="relative">
            <span
              class="bg-acc/20 dark:bg-acc/20 absolute bottom-0 left-0 z-[1] h-5.5 w-1/2 rounded transition-transform duration-300"
              :class="itemType === 'style' ? 'translate-x-0' : 'translate-x-full'"
            ></span>
            <button
              @click="itemType = 'style'"
              :class="
                itemType === 'style'
                  ? 'text-acc dark:text-acc'
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
                  ? 'text-acc dark:text-acc'
                  : 'text-fg hover:text-acc cursor-pointer dark:hover:text-white'
              "
              class="z-10 w-1/2"
            >
              sample
            </button>
          </div>
        </div>
        <div class="relative col-span-4 block py-1">
          <ComboboxInput
            :id="'invo-item-name-combo-1'"
            class="input text-base sm:text-sm/6"
            @change="searchQueries[itemType] = $event.target.value"
            v-model="itemForm.name"
            :displayValue="
              (form) => {
                form === '' ? `Click to search by ${itemType} name` : itemForm.name
              }
            "
          />
          <div class="absolute top-2 right-0">
            <ComboboxButton
              class="relative flex cursor-pointer items-center rounded-r-md px-2 focus:outline-hidden"
            >
              <ChevronUpDownIcon class="size-6 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            v-if="filteredItems.length > 0"
            class="input-dropdown absolute z-10 mt-1 max-h-60 max-w-full min-w-full overflow-auto rounded-md py-1 text-base shadow-md focus:outline-hidden sm:text-sm"
          >
            <ComboboxOption
              v-for="item in filteredItems"
              :key="item.id"
              :value="item"
              as="template"
            >
              <li
                class="hover:text-acc dark:hover:text-acc relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2 py-2 pl-3 font-normal"
                @click="(addItemToForm(item), console.log(item))"
              >
                <div class="truncate">{{ item.name }}</div>
                <div class="truncate">{{ item.price }}</div>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>

        <!-- Numerics -->
        <LeInput
          class="col-span-1"
          placeholder="e.g. x1"
          v-model="itemForm.qty"
          :id="'invo-qty-1'"
          :type="'number'"
        ></LeInput>
        <LeInput
          class="col-span-1"
          v-model="itemForm.time"
          :id="'invo-time-1'"
          :type="'number'"
        ></LeInput>
        <LeInput
          class="col-span-1"
          v-model="itemForm.price"
          :id="'invo-price-1'"
          :type="'number'"
        ></LeInput>
        <div class="col-span-1" v-html="itemForm.itemTotal"></div>
      </Combobox>
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
