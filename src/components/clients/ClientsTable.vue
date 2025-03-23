<script setup>
import { useClientStore } from '@/stores/clients'
import { reactive, ref, computed } from 'vue'
import LeBtn from '@/components/UI/LeBtn.vue'
import LeTd from '../UI/table/LeTd.vue'
import LeInput from '../UI/LeInput.vue'
import LeTh from '../UI/table/LeTh.vue'
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const clientStore = useClientStore()
const editing = ref(false)
// resets client inputs
const resetInputs = (formName) => {
  formName.name = ''
  formName.company = ''
  formName.email = ''
  formName.address = ''
}
const clientForm = reactive({ name: '', company: '', email: '', address: '' })
const editForm = reactive({ id: null, name: '', company: '', email: '', address: '' })

function addNewClient() {
  clientStore.createNew(clientForm)
  resetInputs(clientForm)
}

const editedRowId = ref(null)
// Used to restore initial values on cancel
// const editCache = ref({})
function editTrue(client) {
  editedRowId.value = client.id
  Object.assign(editForm, client)
  editing.value = true
}
function editSave() {
  clientStore.update(editForm)
  // validation
  editing.value = false
  resetInputs(editForm)
}
function cancelEdit() {
  // Reset edit state
  editing.value = false
  editedRowId.value = null
  resetInputs(editForm)
}
function removeClient(client) {
  clientStore.del(client)
}
// Search
const searchQuery = ref('')

const filteredClients = computed(() => {
  return clientStore.clients.filter((c) => {
    return c.name.trim().toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
</script>
<template>
  <div class="flow-root">
    <div class="align-middle">
      <div class="inline-block min-w-full">
        <!-- Search -->
        <div class="w-full max-w-[90%] 2xl:max-w-[70%] mx-auto">
          <div
            class="pt-2 px-2 pb-3 ring-t ring-1 ring-x rounded-t-lg ring-black/10 bg-gray-100/75 w-fit -mb-1"
          >
            <div
              class="flex items-center ring-1 ring-black/10 rounded-lg shadow-sm bg-white px-3 py-2 w-64"
            >
              <MagnifyingGlassIcon class="h-4 w-4 text-gray-400 mr-2"></MagnifyingGlassIcon>
              <input
                id="srchQry-clients-1"
                v-model="searchQuery"
                type="text"
                placeholder="Search clients..."
                class="w-full outline-none text-sm"
              />
            </div>
          </div>
        </div>
        <div
          class="ring-1 overflow-y-auto max-h-[80vh] shadow-md ring-black/10 sm:rounded-lg max-w-[90%] 2xl:max-w-[70%] mx-auto"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead
              class="sticky top-0 z-10 bg-gray-100/75 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter border-b ring-1 ring-gray-300"
            >
              <tr>
                <th scope="col" class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-4">
                  Name
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Company</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Address</th>
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
                  <div class="w-full mx-1 flex justify-center">
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
              <tr v-for="(client, index) in filteredClients" :key="index">
                <!-- Editable Row -->
                <template v-if="editing && editedRowId === client.id">
                  <LeTd>
                    <LeInput
                      :id="`edit-client-name-${client.id}`"
                      :placeholder="client.name"
                      v-model="editForm.name"
                    />
                  </LeTd>
                  <LeTd
                    ><LeInput
                      :id="`edit-client-company-${client.id}`"
                      :placeholder="client.company"
                      v-model="editForm.company"
                  /></LeTd>
                  <LeTd
                    ><LeInput
                      :id="`edit-client-email-${client.id}`"
                      :placeholder="client.email"
                      v-model="editForm.email"
                  /></LeTd>
                  <LeTd
                    ><LeInput
                      :id="`edit-client-address-${client.id}`"
                      :placeholder="client.address"
                      v-model="editForm.address"
                  /></LeTd>
                  <LeTd>
                    <div class="flex gap-5 items-center text-center justify-center w-full py-4">
                      <a href="#" class="text-green-500 hover:text-green-600" @click="editSave()"
                        ><CheckCircleIcon class="size-5"></CheckCircleIcon
                      ></a>
                      <a href="#" class="text-red-400 hover:text-red-500" @click="cancelEdit()"
                        ><XCircleIcon class="size-5"></XCircleIcon
                      ></a>
                    </div>
                  </LeTd>
                </template>
                <!-- Read-Only Row -->
                <template v-else>
                  <LeTd>{{ client.name }}</LeTd>
                  <LeTd>{{ client.company }}</LeTd>
                  <LeTd>{{ client.email }}</LeTd>
                  <LeTd> {{ client.address }}</LeTd>
                  <LeTd>
                    <!-- Controls pading for entire read only row -->
                    <div class="flex gap-5 items-center text-center justify-center w-full py-3">
                      <a href="#" @click="editTrue(client)">
                        <PencilIcon class="size-5.5 hover:text-blue-500"></PencilIcon>
                      </a>
                      <a href="#" class="hover:text-red-400" @click="removeClient(client)">
                        <TrashIcon class="size-5.5"></TrashIcon>
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
</template>
