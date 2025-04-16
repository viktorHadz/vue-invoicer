<script setup>
import InvoiceTo from '@/components/invoice/InvoiceTo.vue'
import LeInput from '@/components/UI/LeInput.vue'
import { computed, ref, reactive, watch, nextTick, useTemplateRef } from 'vue'
import { ChevronUpDownIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { useItemsStore } from '@/stores/items'
import { useInvoiceStore } from '@/stores/invoice'
import LeBtn from '@/components/UI/LeBtn.vue'
import { useToggle } from '@vueuse/core'
import InputToggle from '@/components/UI/InputToggle.vue'
const itemStore = useItemsStore()
const invoStore = useInvoiceStore()
const itemType = ref('style')
const searchQueries = reactive({
  style: '',
  sample: '',
})

const itemForm = reactive({
  id: '',
  name: '',
  type: '',
  time: null,
  price: null,
  itemTotal: null,
})

const filteredItems = computed(() => {
  return itemStore.items[itemType.value].filter((item) =>
    item.name.toLowerCase().includes(searchQueries[itemType.value].toLowerCase()),
  )
})

// Gives item expected properties qty & itemTotal
const selectItem = (item) => {
  const itemQty = item.qty ?? 1
  const newItem = { ...item, qty: itemQty }
  Object.assign(itemForm, newItem)
  sendItem()
  item.qty = 1
}

const sendItem = () => {
  const itemToSend = { ...itemForm }
  console.log('sending item to store: ', itemToSend)
  invoStore.add(itemToSend)
  // Reset search querie, dropdown and focus search
  nextTick(() => {
    resetInputs(itemForm)
    dropDown.value = false
    searchQueries[itemType.value] = ''
    comboInput.value.focus()
  })
}

const toggleItemType = () => {
  if (itemType.value === 'style') {
    resetInputs(itemForm)
    itemType.value = 'sample'
  } else if (itemType.value === 'sample') {
    resetInputs(itemForm)
    itemType.value = 'style'
  }
}

const resetInputs = (formName) => {
  formName.id = ''
  formName.name = ''
  formName.type = itemType.value
  formName.time = null
  formName.price = null
  formName.itemTotal = null
}

const comboInput = useTemplateRef('dropdown-reference')
const dropDown = ref(false)
const toggleDropdown = useToggle(dropDown)

watch(searchQueries, () => {
  if (searchQueries[itemType.value] === '') {
    dropDown.value = false
  } else {
    dropDown.value = true
  }
})
</script>

<template>
  <main
    class="px-20 py-12 2xl:mx-auto 2xl:flex 2xl:max-w-[70%] 2xl:flex-col 2xl:items-center 2xl:px-40"
  >
    <LeBtn @click="invoStore.resetInvoiceData()">log</LeBtn>
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
        <div class="col-span-1 truncate">Time</div>
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
      <hr class="text-acc col-span-8 mask-x-from-80% mask-x-to-95%" />

      <!-- Items -->
      <div
        v-for="(item, index) in invoStore.data.items"
        :key="index"
        class="col-span-8 mt-2 grid grid-cols-subgrid items-center text-base font-normal"
      >
        <div class="col-span-4 pl-4 text-start">{{ item.name }}</div>
        <div class="col-span-1 pr-8 text-end">{{ item.qty }}</div>
        <div class="col-span-1 pr-8 text-end">{{ item.time }}</div>
        <div class="col-span-1 pr-8 text-end">{{ item.price }}</div>
        <div class="col-span-1 pr-8 text-end">{{ item.itemTotal }}</div>
      </div>
      <!-- Combo Box & Item Inputs -->
      <div class="relative col-span-8 grid grid-cols-subgrid items-center gap-6 py-5">
        <!-- Toggle Item Type -->
        <div class="absolute -bottom-1 w-full max-w-36">
          <span
            class="absolute top-0 left-1.5 h-4 w-2 rounded-bl-sm border-b border-l mask-t-from-0"
            :class="itemType === 'style' ? 'border-acc' : 'border-brdr'"
          ></span>
          <div class="relative ml-4">
            <span
              class="bg-acc/20 dark:bg-acc/20 absolute bottom-0 left-0 z-[1] h-5.5 w-1/2 rounded transition-transform duration-300"
              :class="itemType === 'style' ? 'translate-x-0' : 'translate-x-full'"
            ></span>
            <button
              @click="toggleItemType()"
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
              @click="toggleItemType()"
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
          <span
            class="absolute top-0 -right-3 h-4 w-2 rounded-br-sm border-r border-b mask-t-from-0%"
            :class="itemType === 'sample' ? 'border-acc' : 'border-brdr'"
          ></span>
        </div>
        <div class="relative col-span-4 block py-1">
          <!-- Input -->
          <input
            :ref="'dropdown-reference'"
            id="combo-item-add-1"
            type="text"
            class="input hover:drop-shadow-acc/25 focus:drop-shadow-acc/25 text-base drop-shadow-md transition-shadow duration-75 sm:text-sm/6"
            v-model="itemForm.name"
            @input="searchQueries[itemType] = $event.target.value"
            :placeholder="`Type to search by ${itemType} name`"
          />
          <div class="absolute top-2 right-0">
            <button
              class="relative flex cursor-pointer items-center rounded-r-md px-2 focus:outline-hidden"
              @click="(toggleDropdown(), console.log(dropDown))"
            >
              <ChevronUpDownIcon class="hover:text-acc size-6 text-gray-400" aria-hidden="true" />
            </button>
          </div>

          <!-- Dropdown -->
          <transition
            enter-active-class="transition duration-300 origin-top ease-out "
            enter-from-class=" opacity-0 scale-y-25  "
            enter-to-class="  opacity-100 scale-y-100 "
            leave-active-class="transition duration-150  ease-in"
            leave-from-class=" scale-y-100 origin-bottom opacity-100"
            leave-to-class=" scale-y-0 origin-top opacity-0"
          >
            <div
              v-if="filteredItems.length > 0 && dropDown"
              class="input-dropdown absolute z-10 mt-2 max-h-60 max-w-full min-w-full overflow-auto rounded-md py-1 text-base shadow-md focus:outline-hidden sm:text-sm"
            >
              <div v-for="(item, index) in filteredItems" :key="item.id" :value="item">
                <li
                  class="hover:text-acc dark:hover:text-acc relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-2 py-2 font-normal"
                >
                  <button class="flex justify-between">
                    <div class="truncate">{{ item.name }}</div>
                    <div class="truncate">£{{ item.price }}</div>
                  </button>
                  <LeInput
                    :id="`${item.id}-${index}`"
                    class="placeholder:text-acc text-acc w-12"
                    v-model.number="item.qty"
                    min="1"
                    placeholder="1"
                  ></LeInput>
                  <LeBtn class="" @click="selectItem(item)">add</LeBtn>
                </li>
              </div>
            </div>
          </transition>
        </div>
        <div class="relative col-span-1">
          <InputToggle :id="'invo-discount-id-1'" plcholder="hey">
            <template v-slot:left>%</template>
            <template v-slot:right>£</template>
          </InputToggle>
        </div>
      </div>
      <!-- Totals -->
      <div
        class="pointer-events-none col-span-8 mt-2 grid grid-cols-subgrid items-center text-lg font-normal"
      >
        <div
          class="border-acc col-span-3 col-start-6 row-start-1 h-full items-end border-b mask-x-from-85% mask-x-to-95%"
        ></div>
        <!-- vertical line-->
        <div
          class="border-acc col-start-6 row-start-1 row-end-6 h-full border-r mask-y-from-80% mask-y-to-95%"
        ></div>
        <!-- Text -->
        <div class="col-span-1 col-start-6 row-start-1 mr-3 text-end">Subtotal</div>
        <div
          v-if="invoStore.data.prices.discValue || invoStore.data.prices.discValuePercent > 0"
          class="col-span-1 col-start-6 row-start-2 mr-3 text-end"
        >
          Discount
        </div>
        <div class="col-span-1 col-start-6 row-start-3 mr-3 text-end">VAT</div>
        <div class="col-span-1 col-start-6 row-start-4 mr-3 text-end">Total</div>
        <div
          v-if="invoStore.data.prices.depoValue || invoStore.data.prices.depoValuePercent > 0"
          class="col-span-1 col-start-6 row-start-5 mr-3 text-end"
        >
          Deposit
        </div>
        <!-- Value -->

        <div class="col-span-2 col-start-7 row-start-1 mr-2 text-end">
          {{ invoStore.data.prices.subtotal }}
        </div>
        <div
          v-if="invoStore.data.prices.discValue || invoStore.data.prices.discValuePercent > 0"
          class="col-span-2 col-start-7 row-start-2 mr-2 text-end"
        >
          {{ invoStore.data.prices.discValue }}
        </div>
        <div class="col-span-2 col-start-7 row-start-3 mr-2 text-end">
          {{ invoStore.data.prices.vat }}
        </div>
        <div class="col-span-2 col-start-7 row-start-4 mr-2 text-end">
          {{ invoStore.data.prices.total }}
        </div>
        <div
          v-if="invoStore.data.prices.depoValue || invoStore.data.prices.depoValuePercent > 0"
          class="col-span-2 col-start-7 row-start-5 mr-2 text-end"
        >
          {{ invoStore.data.prices.depoValue }}
        </div>
      </div>
    </div>
  </main>
</template>
<style>
.feida-enter-active,
.feida-leave-active {
  transition: opacity 0.5s ease;
}

.feida-enter-from,
.feida-leave-to {
  opacity: 0;
}
</style>
