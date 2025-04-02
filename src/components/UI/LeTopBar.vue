<script setup>
import { ref } from 'vue'
import SelectClient from '../clients/SelectClient.vue'
import LeDarkMode from './LeDarkMode.vue'
import ItemsEditor from '@/components/items/ItemsEditor.vue'
import { useClientStore } from '@/stores/clients'
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/outline'

const clientStore = useClientStore()
const show = ref(false)
function showTopBar() {
  show.value = true
  console.log(show.value)
}
function hideTopBar() {
  show.value = false
  console.log(show.value)
}
</script>
<template>
  <div v-if="clientStore.hasClients" class="absolute -top-12 right-0 z-50">
    <div
      class="bg-sec hover:border-acc relative mr-4 rounded-b-md border-x border-b border-neutral-400 p-2 transition-transform delay-150 duration-300 ease-in-out will-change-transform hover:translate-y-12 dark:border-neutral-600"
      @mouseenter="showTopBar"
      @mouseleave="hideTopBar"
      :class="show ? 'translate-y-2 delay-[260ms]' : 'translate-y-0 delay-300'"
    >
      <div
        class="relative flex items-center gap-4"
        :class="show ? 'translate-y-2 delay-[260ms]' : 'translate-y-0 delay-300'"
      >
        <SelectClient> </SelectClient>
        <LeDarkMode></LeDarkMode>
        <ItemsEditor></ItemsEditor>
      </div>
      <div id="chev-top-bar" class="relative w-fit place-self-end text-right">
        <div class="flex h-5 overflow-hidden">
          <span
            class="flex size-5 w-full transform pt-0.5 transition-transform duration-300"
            :class="show ? 'translate-y-full' : 'translate-y-0'"
            >Selected client, Theme & Items</span
          >
          <ChevronDoubleDownIcon
            class="mt-1 size-5 transform transition-transform duration-300"
            :class="show ? 'translate-y-full' : 'translate-y-0'"
          ></ChevronDoubleDownIcon>
        </div>
      </div>
    </div>
  </div>
</template>
