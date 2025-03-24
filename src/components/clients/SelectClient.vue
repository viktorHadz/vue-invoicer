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
        class="block font-medium tracking-tight pl-1"
        :class="[`${props.selectTitleClass}`]"
      >
        {{ props.selectTitle }}
      </ListboxLabel>
      <ListboxButton
        class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        <span class="col-start-1 row-start-1 truncate pr-6">{{
          clientStore.selectedClient?.name || 'Select a client to continue'
        }}</span>
        <ChevronUpDownIcon
          class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          aria-hidden="true"
        />
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
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
                active ? 'bg-indigo-600 text-white outline-hidden' : 'text-gray-900',
                'relative cursor-default py-2 pr-4 pl-8 select-none',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                client.name
              }}</span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
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
