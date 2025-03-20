<script setup>
import { reactive } from 'vue'
import LeBtn from '../UI/LeBtn.vue'
import LeInput from '../UI/LeInput.vue'
import { useClientStore } from '@/stores/clients'
const store = useClientStore()

const resetInputs = () => {
  newClient.name = ''
  newClient.company = ''
  newClient.email = ''
  newClient.address = ''
}
const newClient = reactive({
  name: '',
  company: '',
  email: '',
  address: '',
})

const addNewClient = (client) => {
  store.createNew(client)
  resetInputs()
}
</script>

<template>
  <div class="flex gap-4">
    <LeInput
      labelName="Client name"
      v-model="newClient.name"
      id="client-name"
      inputName="clients-name"
      inputType="text"
      class="w-full"
      autocompleteType="name"
    />
    <LeInput
      labelName="Company"
      v-model="newClient.company"
      id="company-name"
      inputType="text"
      inputName="clients-company"
      autocompleteType="organization"
      class="w-full"
    />
  </div>
  <div class="flex gap-4">
    <LeInput
      labelName="Email"
      v-model="newClient.email"
      inputType="text"
      id="client-email"
      inputName="clients-email"
      class="w-full"
    />
    <LeInput
      labelName="Address"
      v-model="newClient.address"
      inputType="text"
      id="client-address"
      inputName="clients-address"
      class="w-full"
    />
  </div>
  <div>
    <LeBtn class="mt-4" variant="primary" @click="addNewClient(newClient)"> Add New Client </LeBtn>
  </div>
</template>
