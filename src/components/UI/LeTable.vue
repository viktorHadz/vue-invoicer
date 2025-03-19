<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Users',
    },
    description: {
      type: String,
      default: 'A list of all the users including their name, title, email, and role.',
    },
    buttonLabel: {
      type: String,
      default: 'Add User',
    },
    columns: {
      type: Array,
      required: true, // [{ label: "Name", key: "name" }, { label: "Email", key: "email" }]
    },
    data: {
      type: Array,
      required: true, // [{ name: "John Doe", email: "john@example.com" }]
    },
  },
}
</script>
<script setup>
import LeBtn from './LeBtn.vue'
</script>
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">{{ title }}</h1>
        <p class="mt-2 text-sm text-gray-700">{{ description }}</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <LeBtn @click="$emit('add')">{{ buttonLabel }}</LeBtn>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                >
                  {{ column.label }}
                </th>
                <th
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td
                  v-for="(column, colIndex) in columns"
                  :key="colIndex"
                  :class="[
                    rowIndex !== data.length - 1 ? 'border-b border-gray-200' : '',
                    'px-3 py-4 text-sm text-gray-500 whitespace-nowrap',
                  ]"
                >
                  {{ row[column.key] }}
                </td>
                <td
                  :class="[
                    rowIndex !== data.length - 1 ? 'border-b border-gray-200' : '',
                    'relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap',
                  ]"
                >
                  <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-900"
                    @click="$emit('edit', row)"
                  >
                    Edit<span class="sr-only">, {{ row.name }}</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
