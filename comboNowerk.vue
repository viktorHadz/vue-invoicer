<Combobox as="div" class="relative col-span-8 grid grid-cols-subgrid items-center gap-6 pt-5">
  <!-- Style/Sample Toggle -->
  <div class="absolute -top-1 w-full max-w-36">
    <!-- animated handle -->
    <div class="relative">
      <span
        class="bg-acc/20 dark:bg-acc/20 absolute bottom-0 left-0 z-[1] h-5.5 w-1/2 rounded transition-transform duration-300"
        :class="activeItemType === 'style' ? 'translate-x-0' : 'translate-x-full'"
      ></span>
      <button
        @click="activeItemType = 'style'"
        :class="
          activeItemType === 'style'
            ? 'text-acc dark:text-acc'
            : 'text-fg hover:text-acc cursor-pointer dark:hover:text-white'
        "
        class="z-10 w-1/2"
      >
        style
      </button>
      <button
        @click="activeItemType = 'sample'"
        :class="
          activeItemType === 'sample'
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
      @change="searchQueries[activeItemType] = $event.target.value"
      :displayValue="
        (item) => {
          ;(item.name === itemSelected.name) === ''
            ? `Click to search by ${activeItemType} name`
            : itemSelected.name
        }
      "
      v-model="itemSelected.name"
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
          @click="addItemToForm(item)"
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
    v-model="itemSelected.qty"
    :id="'invo-qty-1'"
    :type="'number'"
  ></LeInput>
  <LeInput
    class="col-span-1"
    v-model="itemSelected.time"
    :id="'invo-time-1'"
    :type="'number'"
  ></LeInput>
  <LeInput
    class="col-span-1"
    v-model="itemSelected.price"
    :id="'invo-price-1'"
    :type="'number'"
  ></LeInput>
  <div class="col-span-1" v-html="itemSelected.itemTotal"></div>
</Combobox>
