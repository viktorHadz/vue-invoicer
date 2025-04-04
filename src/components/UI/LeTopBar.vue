<script setup>
import { ref } from 'vue'
import SelectClient from '../clients/SelectClient.vue'
import LeDarkMode from './LeDarkMode.vue'
import ItemsEditor from '@/components/items/ItemsEditor.vue'
import { useClientStore } from '@/stores/clients'
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/outline'

const clientStore = useClientStore()

const show = ref(false)
function toggleTopBar() {
  show.value = !show.value
  console.log('Show?:', show.value)
}
</script>
<template>
  <div v-if="clientStore.hasClients" class="absolute top-0 right-0">
    <div
      class="bg-sec relative mr-4 rounded-b-md border-x border-b border-neutral-400 transition-transform delay-150 duration-300 ease-in-out will-change-transform dark:border-neutral-600"
      :class="show === true ? 'translate-y' : '-translate-y-13.5'"
    >
      <div class="relative flex items-center gap-4 p-2">
        <div>
          <SelectClient
            title="select a client"
            select-title=""
            select-title-class="text-xs font-normal"
          >
          </SelectClient>
        </div>
        <LeDarkMode></LeDarkMode>
        <ItemsEditor></ItemsEditor>
      </div>
      <button
        @click="toggleTopBar()"
        :title="!show ? 'click to expand' : ''"
        class="hover:bg-acc/70 dark:hover:bg-acc/10 dark:hover:text-acc flex size-5 w-full cursor-pointer items-center p-1 text-sm"
      >
        <div
          class="flex w-full justify-between px-2 text-xs"
          :class="show == true ? '' : 'dark:text-acc text-fg rotate-0'"
        >
          <span class="">Selected Client</span> <span>Theme</span> <span>Items</span>
        </div>

        <ChevronDoubleDownIcon
          class="size-4 transition-transform duration-300 ease-in-out will-change-transform"
          :class="show == true ? 'rotate-180' : 'dark:text-acc text-fg rotate-0'"
        >
        </ChevronDoubleDownIcon>
      </button>
    </div>
  </div>
</template>
