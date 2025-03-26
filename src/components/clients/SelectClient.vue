<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/16/solid'
import { useClientStore } from '@/stores/clients'

const clientStore = useClientStore()
const props = defineProps({
  selectTitle: String,
  selectTitleClass: String,
})
</script>

<template>
  <Listbox as="div" v-model="clientStore.selectedClient">
    <div class="relative min-w-40">
      <ListboxLabel
        class="block pl-1 font-medium tracking-tight"
        :class="[`${props.selectTitleClass}`]"
      >
        {{ props.selectTitle }}
      </ListboxLabel>
      <ListboxButton
        class="bg-vbg-head2 hover:bg-vbg-head text-fg outline-vborder focus:outline-vborder grid w-full cursor-default grid-cols-1 rounded-md py-1.5 pr-2 pl-3 text-left outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
      >
        <span class="col-start-1 row-start-1 truncate pr-6">{{
          clientStore.selectedClient?.name || 'Select a client to continue'
        }}</span>
        <ChevronUpDownIcon
          class="text-fg col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4"
          aria-hidden="true"
        />
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="bg-vbg-head2 ring-vborder absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 focus:outline-hidden sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="client in clientStore.clients"
            :key="client.id"
            :value="client"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-vbg-body text-fg-2 outline-hidden' : 'text-fg',
                'relative cursor-default py-2 pr-4 pl-8 select-none',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                client.name
              }}</span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-fg-2' : 'text-fg',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
