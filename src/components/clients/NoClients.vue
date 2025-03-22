<script setup>
import { ref, reactive } from 'vue'
import { UserPlusIcon } from '@heroicons/vue/24/outline'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import LeInput from '../UI/LeInput.vue'
import LeBtn from '../UI/LeBtn.vue'
const isOpen = ref(true)

import { useClientStore } from '@/stores/clients'
const clientStore = useClientStore()
const resetInputs = () => {
  form.name = ''
  form.company = ''
  form.email = ''
  form.address = ''
}
const form = reactive({ name: '', company: '', email: '', address: '' })

function addNewClient() {
  clientStore.createNew(form)
  // Validation?
  resetInputs()
}

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
<template>
  <div class="container">
    <button
      type="button"
      class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden cursor-pointer"
      @click="openModal"
    >
      <userPlusIcon class="size-12 mx-auto text-gray-400" />

      <span class="mt-2 block text-sm font-semibold text-gray-900">Create a new client</span>
    </button>
    <Teleport to="body">
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full w-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle as="h3" class="font-medium text-center leading-6 text-gray-900">
                    New Client
                  </DialogTitle>

                  <div class="px-4 py-6 sm:p-8">
                    <div class="flex flex-col gap-8 w-full">
                      <div>
                        <LeInput
                          label="Name"
                          id="client-add-name-id-1"
                          name="client-name"
                          type="text"
                          autocomplete="name"
                          required
                          v-model="form.name"
                        />
                      </div>
                      <div>
                        <LeInput
                          label="Company"
                          id="client-add-company-1"
                          name="client-company"
                          type="text"
                          autocomplete="organization"
                          required
                          v-model="form.company"
                        />
                      </div>
                      <div>
                        <LeInput
                          label="Email"
                          id="client-add-email-1"
                          name="client-email"
                          type="text"
                          autocomplete="email"
                          required
                          v-model="form.email"
                        />
                      </div>
                      <div>
                        <LeInput
                          label="Address"
                          id="client-add-address-1"
                          name="client-address"
                          type="text"
                          autocomplete="address"
                          required
                          v-model="form.address"
                        />
                      </div>
                      <div class="flex w-full justify-center">
                        <LeBtn
                          @click="(addNewClient(form), console.log('add new in template clicked '))"
                          buttonText="Add New"
                        ></LeBtn>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </div>
</template>
