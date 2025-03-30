<script setup>
import { ref, computed, onMounted } from 'vue'
import { BriefcaseIcon } from '@heroicons/vue/24/outline'
import { useItemsStore } from '@/stores/items'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { TrashIcon, PencilIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import LeBtn from '../UI/LeBtn.vue'
import LeInput from '../UI/LeInput.vue'
import LeFlexTd from '../UI/table/LeFlexTd.vue'
import LeFlexTh from '../UI/table/LeFlexTh.vue'

const isOpen = ref(false)
const itemStore = useItemsStore()

onMounted(() => {
  itemStore.fetchStyles()
})

const styles = ref(itemStore.fakeItems)
const styleSearchQuery = ref('')

const displayStyles = computed(() => {
  return styles.value.filter((style) => {
    return style.title.trim().toLowerCase().includes(styleSearchQuery.value.toLowerCase())
  })
})

const editing = ref(false)

const selectedEl = ref('style')

const sliderTransform = computed(() =>
  selectedEl.value === 'style' ? 'translate-x-[-51%] text-red-500' : 'translate-x-[51%]',
)

function moveSlider(tabName) {
  selectedEl.value = tabName
  console.log(selectedEl.value)
}
</script>
<template>
  <div class="flex flex-col items-center">
    <!-- Text that always stays gray-900 -->
    <p class="block text-sm font-medium tracking-tight">Items</p>

    <BriefcaseIcon
      @click="isOpen = true"
      class="hover:text-acc size-8 cursor-pointer stroke-1 transition-colors"
    ></BriefcaseIcon>
  </div>

  <Teleport to="body">
    <transition name="fadeItIn">
      <div
        v-if="isOpen"
        class="fixed inset-0 top-0 right-0 z-[900] h-[100vh] w-[100vw] bg-black/50 select-none"
      ></div>
    </transition>

    <transition mode="out-in" name="slideItIn">
      <div
        class="bg-primary fixed top-0 right-0 z-[901] h-[100vh] w-[50vw] 2xl:w-1/3 dark:bg-neutral-800"
        v-if="isOpen"
      >
        <div class="">
          <div class="relative top-6 flex w-full">
            <!-- Search -->
            <div class="ml-2 w-1/3">
              <div class="flex items-center">
                <input
                  id="srchQry-styles-1"
                  v-model="styleSearchQuery"
                  type="text"
                  placeholder="Search styles..."
                  class="input"
                />
              </div>
            </div>
            <LeBtn @click="isOpen = false" class="absolute right-20">Close</LeBtn>
          </div>
          <div class="w-full px-2 py-12 sm:px-0">
            <TabGroup>
              <TabList class="relative flex w-full items-center justify-around place-self-center">
                <!-- Slider-->
                <span
                  class="dark:bg-acc/30 bg-sec border-brdr dark:border-brdr absolute -bottom-1 z-10 h-[130%] w-[48%] transform rounded-md border transition-transform duration-500 ease-in-out"
                  :class="sliderTransform"
                />
                <!-- Tabs -->
                <Tab
                  class="z-20 w-1/2 cursor-pointer focus:outline-none"
                  @click="moveSlider('style')"
                >
                  <button
                    :class="
                      selectedEl === 'style'
                        ? 'text-fg2 dark:text-sec transition duration-500 ease-out'
                        : 'text-fg hover:text-acc hover:cursor-pointer'
                    "
                  >
                    Styles
                  </button>
                </Tab>
                <Tab
                  class="z-20 w-1/2 cursor-pointer focus:outline-none"
                  @click="moveSlider('sample')"
                >
                  <button
                    :class="
                      selectedEl === 'sample'
                        ? 'text-fg2 dark:text-sec transition duration-500 ease-out'
                        : 'text-fg hover:text-acc hover:cursor-pointer'
                    "
                  >
                    Samples
                  </button>
                </Tab>
              </TabList>
              <TabPanels class="p-2">
                <LeFlexTh class="rounded-t-md">
                  <div scope="col" class="w-[40%] py-2 pl-2">Name</div>
                  <div scope="col" class="w-[20%] py-2 pl-2">Price</div>
                  <div scope="col" class="w-[20%] py-2 pl-2">Time</div>
                  <div scope="col" class="w-[20%] py-2 text-center">Action</div>
                </LeFlexTh>
                <TabPanel class="border-brdr rounded-b border-x border-b">
                  <div class="max-h-[80vh] overflow-y-auto">
                    <div
                      v-for="(style, index) in displayStyles"
                      :key="index"
                      class="w-full items-center"
                    >
                      <LeFlexTd>
                        <!-- Editable Row -->
                        <template v-if="editing && editedRowId === style.id">
                          <LeInput
                            :id="`edit-client-name-${style.id}`"
                            :placeholder="style.name"
                            v-model="editForm.name"
                          />
                          ><LeInput
                            :id="`edit-client-company-${style.id}`"
                            :placeholder="style.company"
                            v-model="editForm.company"
                          />
                          ><LeInput
                            :id="`edit-client-email-${style.id}`"
                            :placeholder="style.email"
                            v-model="editForm.email"
                          />
                          ><LeInput
                            :id="`edit-client-address-${style.id}`"
                            :placeholder="style.address"
                            v-model="editForm.address"
                          />
                          <div
                            class="flex w-full items-center justify-center gap-5 py-4 text-center"
                          >
                            <a
                              href="#"
                              class="text-success hover:brightness-110"
                              @click="editSave()"
                              ><CheckCircleIcon class="size-5"></CheckCircleIcon
                            ></a>
                            <a
                              href="#"
                              class="text-danger hover:brightness-110"
                              @click="cancelEdit()"
                              ><XCircleIcon class="size-5"></XCircleIcon
                            ></a>
                          </div>
                        </template>
                        <!-- Read-Only Row -->
                        <template v-else>
                          <!-- name -->
                          <div class="line-clamp-1 w-[40%] pl-2">{{ style.title }}</div>
                          <!-- time -->
                          <div class="w-[20%] pl-2">{{ style.price }}</div>
                          <!-- price -->
                          <div class="w-[20%] pl-2">{{ style.price }}</div>
                          <!-- action -->
                          <div class="w-[20%]">
                            <!-- Controls pading for entire read only row -->
                            <div
                              class="flex w-full items-center justify-center gap-5 py-3 text-center"
                            >
                              <a href="#" @click="editTrue(style)">
                                <PencilIcon class="hover:text-success size-5"></PencilIcon>
                              </a>
                              <a href="#" class="hover:text-danger" @click="removeClient(style)">
                                <TrashIcon class="size-5"></TrashIcon>
                              </a>
                            </div>
                          </div>
                        </template>
                      </LeFlexTd>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>Samples looped</TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<style scoped>
.fadeItIn-enter-active,
.fadeItIn-leave-active {
  transition: opacity 0.3s ease;
}

.fadeItIn-enter-from,
.fadeItIn-leave-to {
  opacity: 0;
}
.slideItIn-enter-to,
.slideItIn-leave-from {
  opacity: 1;
}

.slideItIn-enter-active,
.slideItIn-leave-active {
  transition: transform 0.5s ease;
}
.slideItIn-enter-from,
.slideItIn-leave-to {
  transform: translateX(100%);
}
.slideItIn-enter-to,
.slideItIn-leave-from {
  transform: translateX(0);
}
</style>
