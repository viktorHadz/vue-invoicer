<script setup>
defineProps({
  id: String,
  plcholder: String,
})
</script>
<template>
  <div>
    <input
      :id="id"
      :placeholder="plcholder"
      type="number"
      class="input hover:drop-shadow-acc/25 focus:drop-shadow-acc/25 text-base drop-shadow-md transition-shadow duration-75 sm:text-sm/6"
    />
  </div>
</template>
