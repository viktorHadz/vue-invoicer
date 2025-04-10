<script setup>
import InvoiceTo from '@/components/invoice/InvoiceTo.vue'
import LeInput from '@/components/UI/LeInput.vue'
import { computed, ref, reactive, watch } from 'vue'
import { ChevronUpDownIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { useItemsStore } from '@/stores/items'
import LeBtn from '@/components/UI/LeBtn.vue'
import { useToggle } from '@vueuse/core'

const itemStore = useItemsStore()

const itemType = ref('style')
const searchQueries = reactive({
  style: '',
  sample: '',
})
const selectedItem = reactive({
  id: '',
  name: '',
  type: '',
  time: null,
  qty: null,
  price: null,
  itemTotal: null,
})
const stateSelected = ref(false)

const filteredItems = computed(() => {
  return itemStore.items[itemType.value].filter((item) =>
    item.name.toLowerCase().includes(searchQueries[itemType.value].toLowerCase()),
  )
})
// const addItemToInvo = (item) => {
//   Object.assign(itemForm, item)
// }
// function selectItem(item) {}

const selectItem = (item) => {
  const newItem = { ...item, qty: 1, itemTotal: item.time * item.price }
  Object.assign(selectedItem, newItem)
  // aids separating state editing from selected - reset in resets
  stateSelected.value = true
  dropdownValue.value = false
}

const toggleItemType = () => {
  if (itemType.value === 'style') {
    resetInputs(selectedItem)
    itemType.value = 'sample'
  } else if (itemType.value === 'sample') {
    resetInputs(selectedItem)
    itemType.value = 'style'
  }
}

const resetInputs = (formName) => {
  formName.id = ''
  formName.name = ''
  formName.type = itemType.value
  formName.time = null
  formName.qty = null
  formName.price = null
  formName.itemTotal = null
  stateSelected.value = false
}
const dropdownValue = ref(false)
const toggleDropdown = useToggle(dropdownValue)
watch(stateSelected, (newValue, oldValue) => {
  console.log('Watcher=> state selected', oldValue)
  console.log('Watcher=> state selected', newValue)
})
watch(searchQueries, () => {
  if (searchQueries[itemType.value] !== '') {
    dropdownValue.value = true
    console.log(searchQueries)
  } else {
    dropdownValue.value = false
  }
})
// Two items one shows one hides
// Third item takes the text
// When typing show the dropdown

// onType --> clear form --> open dropdown --> filter
// click item button --> add name to input --> close dropdown --> allow Editing and add to invoice
// click again focus text
// on button open --> clear form -->  focus --> input
</script>

<template>
  <main
    class="px-20 py-18 2xl:mx-auto 2xl:flex 2xl:max-w-[70%] 2xl:flex-col 2xl:items-center 2xl:px-40"
  >
    <LeBtn
      @click="
        console.log(
          'Item: ',
          itemType,
          'selectedItem: ',
          selectedItem,
          'Item selected watch',
          stateSelected,
        )
      "
      >log</LeBtn
    >
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
      <hr class="text-fg/50 col-span-8 my-2" />
      <!-- Combo Box & Item Inputs -->
      <div class="relative col-span-8 grid grid-cols-subgrid items-center gap-6 py-5">
        <!-- Toggle Item Type -->
        <div class="absolute -top-1 w-full max-w-36">
          <div class="relative">
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
        </div>
        <div class="relative col-span-4 block py-1">
          <!-- Input -->
          <input
            id="combo-item-add-1"
            type="text"
            class="input input hover:drop-shadow-acc/25 focus:drop-shadow-acc/25 text-base drop-shadow-md transition-shadow duration-75 sm:text-sm/6"
            v-model="selectedItem.name"
            @input="searchQueries[itemType] = $event.target.value"
            :placeholder="`Type to search by ${itemType} name`"
          />
          <div class="absolute top-2 right-0">
            <button
              class="relative flex cursor-pointer items-center rounded-r-md px-2 focus:outline-hidden"
              @click="(toggleDropdown(), console.log('Dropdown', dropdownValue))"
            >
              <ChevronUpDownIcon class="hover:text-acc size-6 text-gray-400" aria-hidden="true" />
            </button>
          </div>
          <transition
            enter-active-class="transition duration-300 "
            enter-from-class=" opacity-0   "
            enter-to-class="  opacity-100  "
            leave-active-class="transition duration-150  "
            leave-from-class="  opacity-100"
            leave-to-class="  opacity-0"
          >
            <div
              v-if="stateSelected && !dropdownValue"
              class="text-acc absolute -bottom-4.5 left-2.5"
            >
              <span class="absolute h-3 w-2 rounded-bl-sm border-b border-l mask-t-from-0"></span>
              <span
                class="absolute right-0 h-3 w-2 rounded-br-sm border-r border-b mask-t-from-0%"
              ></span>
              <div class="relative mr-4 ml-4 line-clamp-1 overflow-clip text-sm font-normal">
                Add selected to invoice as a new item
              </div>
            </div>
          </transition>

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
              v-if="filteredItems.length > 0 && dropdownValue"
              class="input-dropdown absolute z-10 mt-2 max-h-60 max-w-full min-w-full overflow-auto rounded-md py-1 text-base shadow-md focus:outline-hidden sm:text-sm"
            >
              <div
                v-for="(item, index) in filteredItems"
                :key="item.id"
                :value="item"
                as="template"
              >
                <li
                  class="relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-2 py-2 font-normal"
                >
                  <button
                    class="hover:text-acc dark:hover:text-acc flex cursor-pointer justify-between"
                    @click="selectItem(item)"
                  >
                    <div class="truncate">{{ item.name }}</div>
                    <div class="truncate">{{ item.price }}</div>
                  </button>
                  <LeInput
                    :id="`${item.id}-${index}`"
                    class="placeholder:text-acc text-acc w-12"
                    v-model="selectedItem.qty"
                    placeholder="1"
                  ></LeInput>
                  <LeBtn class="mr-1">add</LeBtn>
                  <div title="quick add item without selecting">
                    <QuestionMarkCircleIcon
                      class="hover:text-acc relative z-20 size-5 cursor-pointer"
                    ></QuestionMarkCircleIcon>
                  </div>
                </li>
              </div>
            </div>
          </transition>
        </div>
        <!-- Numerics -->
        <LeInput
          class="col-span-1"
          placeholder="x1"
          v-model="selectedItem.qty"
          :id="'invo-qty-1'"
          :type="'number'"
        ></LeInput>
        <LeInput
          class="col-span-1"
          v-model="selectedItem.time"
          :disabled="itemType === 'style' ? true : false"
          :id="'invo-time-1'"
          :type="'number'"
          :placeholder="itemType === 'style' ? 'N/A' : 'min'"
          :title="itemType === 'style' ? 'No time property for styles' : 'min'"
        ></LeInput>
        <LeInput
          class="col-span-1"
          v-model="selectedItem.price"
          :id="'invo-price-1'"
          :type="'number'"
          placeholder="item price"
        ></LeInput>
        <input
          id="invo-total-1"
          class="text-acc placeholder:text-acc input hover:!ring-brdr col-span-1 cursor-default select-none"
          v-model="selectedItem.itemTotal"
          disabled="true"
          placeholder="0"
          title="Cannot edit item total price"
        />
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
