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
        class="grid w-full cursor-default grid-cols-1 rounded-md bg-neutral-200 py-1.5 pr-2 pl-3 text-left text-neutral-900 outline-1 -outline-offset-1 outline-neutral-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-zinc-900 dark:text-neutral-300 dark:outline-neutral-600 dark:focus:outline-neutral-600"
      >
        <span class="col-start-1 row-start-1 truncate pr-6">{{
          clientStore.selectedClient?.name || 'Select a client to continue'
        }}</span>
        <ChevronUpDownIcon
          class="col-start-1 row-start-1 size-5 self-center justify-self-end sm:size-4"
          aria-hidden="true"
        />
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-100 py-1 text-base shadow-lg ring-1 focus:outline-hidden sm:text-sm dark:bg-zinc-900"
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
                active
                  ? 'bg-neutral-50 text-neutral-950 outline-hidden dark:bg-zinc-800 dark:text-neutral-300'
                  : 'text-neutral-700 dark:text-neutral-500',
                'relative cursor-default py-2 pr-4 pl-8 select-none',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold text-neutral-900 dark:text-neutral-300' : 'font-normal',
                  'block truncate',
                ]"
                >{{ client.name }}</span
              >

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
