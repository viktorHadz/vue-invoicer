<script setup>
import { useClientStore } from '@/stores/clients'
import LeTable from '@/components/UI/LeTable.vue'
const clientStore = useClientStore()
const { clients } = clientStore
</script>
<template>
  <div class="">
    <LeTable
      :description="'A list of all the clients including their name, company, email, and address.'"
      :buttonLabel="'Add Client'"
      :columns="[
        { label: 'Name', key: 'name' },
        { label: 'Company', key: 'company' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
      ]"
      :data="clients"
      @edit="
        (client) => {
          /* handle edit client */
        }
      "
      @delete="
        (client) => {
          /* handle edit client */
        }
      "
    >
    </LeTable>
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
