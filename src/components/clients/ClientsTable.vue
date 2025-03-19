<script setup>
import { useClientStore } from '@/stores/clients'
import { reactive } from 'vue'
import LeBtn from '../UI/LeBtn.vue'

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
    <div class="table">
      <div class="row header">
        <div class="cell">Name</div>
        <div class="cell">Company</div>
        <div class="cell">Email</div>
        <div class="cell">Address</div>
      </div>
      <div class="row" v-for="client in clients" :key="client.id">
        <div class="cell">{{ client.name }}</div>
        <div class="cell">{{ client.company }}</div>
        <div class="cell">{{ client.email }}</div>
        <div class="cell">{{ client.address }}</div>
      </div>
      <div></div>
    </div>

    <LeBtn>Create Client</LeBtn>
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
