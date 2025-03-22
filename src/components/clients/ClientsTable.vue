<script setup>
import { useClientStore } from '@/stores/clients'
import { reactive, ref } from 'vue'
import LeBtn from '@/components/UI/LeBtn.vue'
import LeTd from '../UI/table/LeTd.vue'
import LeInput from '../UI/LeInput.vue'
import LeTh from '../UI/table/LeTh.vue'

const clientStore = useClientStore()
const editing = ref(false)

const resetInputs = () => {
  clientForm.name = ''
  clientForm.company = ''
  clientForm.email = ''
  clientForm.address = ''
}
const clientForm = reactive({ name: '', company: '', email: '', address: '' })

function addNewClient() {
  clientStore.createNew(clientForm)
  resetInputs()
}

const editedRowId = ref(null)
const beforeEditCache = reactive({ name: '', company: '', email: '', address: '' })
function editTrue(client) {
  editedRowId.value = client.id
  // add validation
  if (client.id === editedRowId.value) {
    beforeEditCache.value = client
    editing.value = true
  }
}

function editSave(client) {
  clientStore.update(client)
  editing.value = false
  resetInputs()
}

function removeClient(client) {
  clientStore.del(client)
}
</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead
                class="sticky top-0 z-10 bg-gray-100/75 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter border-b ring-1 ring-gray-300"
              >
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                  >
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Address
                  </th>
                  <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-6 text-center">Action</th>
                </tr>
                <tr>
                  <LeTh>
                    <LeInput
                      label=""
                      id="client-add-name-id-1"
                      name="client-name"
                      type="text"
                      autocomplete="name"
                      placeholder="Client name"
                      required
                      v-model="clientForm.name"
                    />
                  </LeTh>
                  <LeTh>
                    <LeInput
                      label=""
                      id="client-add-company-1"
                      name="client-company"
                      type="text"
                      placeholder="Company name"
                      autocomplete="organization"
                      required
                      v-model="clientForm.company"
                    />
                  </LeTh>
                  <LeTh>
                    <LeInput
                      label=""
                      id="client-add-email-1"
                      name="client-email"
                      type="text"
                      placeholder="Email"
                      autocomplete="email"
                      required
                      v-model="clientForm.email"
                    />
                  </LeTh>
                  <LeTh>
                    <LeInput
                      label=""
                      id="client-add-address-1"
                      name="client-address"
                      type="text"
                      placeholder="Address"
                      autocomplete="address"
                      required
                      v-model="clientForm.address"
                    />
                  </LeTh>
                  <LeTh class="">
                    <div class="w-full flex justify-center">
                      <LeBtn
                        @click="
                          (addNewClient(clientForm), console.log('add new in template clicked '))
                        "
                        buttonText="Add New"
                      ></LeBtn>
                    </div>
                  </LeTh>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(client, index) in clientStore.clients" :key="index">
                  <!-- Editable Row -->
                  <template v-if="editing && editedRowId === client.id">
                    <LeTd>
                      <LeInput
                        :id="`edit-client-name-${client.id}`"
                        :placeholder="client.name"
                        v-model="clientForm.name"
                      />
                    </LeTd>
                    <LeTd
                      ><LeInput
                        :id="`edit-client-company-${client.id}`"
                        :placeholder="client.company"
                        v-model="clientForm.company"
                    /></LeTd>
                    <LeTd
                      ><LeInput
                        :id="`edit-client-email-${client.id}`"
                        :placeholder="client.email"
                        v-model="clientForm.email"
                    /></LeTd>
                    <LeTd
                      ><LeInput
                        :id="`edit-client-address-${client.id}`"
                        :placeholder="client.address"
                        v-model="clientForm.address"
                    /></LeTd>
                    <LeTd>
                      <div class="flex gap-4 items-center text-center justify-center w-full py-4">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900"
                          @click="editSave(client)"
                          >Save</a
                        >
                        <a href="#" class="text-red-600 hover:text-red-900" @click="editing = false"
                          >Cancel</a
                        >
                      </div>
                    </LeTd>
                  </template>
                  <!-- Read-Only Row -->
                  <template v-else>
                    <LeTd>{{ client.name }}</LeTd>
                    <LeTd>{{ client.company }}</LeTd>
                    <LeTd>{{ client.email }}</LeTd>
                    <LeTd>{{ client.address }}</LeTd>
                    <LeTd>
                      <!-- Controls pading for entire read only row -->
                      <div class="flex gap-4 items-center text-center justify-center w-full py-3">
                        <a
                          href="#"
                          class="text-indigo-600 hover:text-indigo-900"
                          @click="editTrue(client)"
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          class="text-red-600 hover:text-red-900"
                          @click="removeClient(client)"
                        >
                          Delete
                        </a>
                      </div>
                    </LeTd>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
