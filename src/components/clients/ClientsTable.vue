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
    <div class="sm:flex sm:items-center"></div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <LeTh>
                  <LeInput
                    label="Name"
                    id="client-add-name-id-1"
                    name="client-name"
                    type="text"
                    autocomplete="name"
                    required
                    v-model="clientForm.name"
                  />
                </LeTh>
                <LeTh>
                  <LeInput
                    label="Company"
                    id="client-add-company-1"
                    name="client-company"
                    type="text"
                    autocomplete="organization"
                    required
                    v-model="clientForm.company"
                  />
                </LeTh>
                <LeTh>
                  <LeInput
                    label="Email"
                    id="client-add-email-1"
                    name="client-email"
                    type="text"
                    autocomplete="email"
                    required
                    v-model="clientForm.email"
                  />
                </LeTh>
                <LeTh>
                  <LeInput
                    label="Address"
                    id="client-add-address-1"
                    name="client-address"
                    type="text"
                    autocomplete="address"
                    required
                    v-model="clientForm.address"
                  />
                </LeTh>
                <LeTh>
                  <LeBtn
                    @click="(addNewClient(clientForm), console.log('add new in template clicked '))"
                    buttonText="Add New"
                  ></LeBtn>
                </LeTh>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(client, index) in clientStore.clients" :key="index">
                <!-- Editable Row -->
                <template v-if="editing && editedRowId === client.id">
                  <LeTd
                    ><LeInput
                      :id="`edit-client-name-${client.id}`"
                      :placeholder="client.name"
                      v-model="clientForm.name"
                  /></LeTd>
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
                    <div class="flex gap-4">
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
                    <div class="flex gap-4">
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
</template>
