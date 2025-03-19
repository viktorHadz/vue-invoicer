<script setup>
import { useClientStore } from '@/stores/clients'
import { reactive } from 'vue'
import LeTable from '@/components/UI/LeTable.vue'
import LeInput from '../UI/LeInput.vue'
LeInput
const clientStore = useClientStore()
const { clients } = clientStore
const newClient = reactive({
  name: null,
  company: null,
  email: null,
  address: null,
})
</script>
<template>
  <div class="container">
    <LeTable
      :title="'Clients'"
      :description="'A list of all the clients including their name, company, email, and address.'"
      :buttonLabel="'Add Client'"
      :columns="[
        { label: 'Name', key: 'name' },
        { label: 'Company', key: 'company' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
      ]"
      :data="clients"
      :inputData="newClient"
      @add="
        () => {
          /* handle add client */
        }
      "
      @edit="
        (client) => {
          /* handle edit client */
        }
      "
    >
    </LeTable>
    <div>
      <LeInput labelName="Client name" :value="newClient.name"></LeInput>
      <LeInput labelName="Company" :value="newClient.company"></LeInput>
      <LeInput labelName="Email" :value="newClient.email"></LeInput>
      <LeInput labelName="Address" :value="newClient.address"></LeInput>
    </div>
  </div>
</template>

<style scoped>
.table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}
.row {
  display: table-row;
}
.header {
  font-weight: 700;
  background-color: #f5f5f5;
}
.cell {
  display: table-cell;
  border: 1px solid #ddd;
  padding: 8px;
}
.flex-direction {
  display: inline-flex;
  flex-direction: row;
}
</style>
