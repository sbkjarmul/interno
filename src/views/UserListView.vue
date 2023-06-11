<template>
  <div class="d-flex justify-space-between flex-column h-100">
    <div class="w-100 text-start">
      <h1 class="m-0 text-h4">Users list</h1>
    </div>

    <div class="my-5 px-5 py-10 h-100 shadow rounded bg-white">
      <div class="d-flex flex-row pb-3">
        <div class="w-50">
          <v-text-field
            v-model="search"
            placeholder="Search for users"
            clearable
            variant="outlined"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
        <div class="w-50 d-flex justify-end">
          <v-btn
            prepend-icon="mdi-plus"
            variant="flat"
            size="large"
            rounded="xl"
            class="bg-primary text-capitalize letter-spacing-0"
            @click="handleAddUser"
            >Add user</v-btn
          >
        </div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left" width="10%"></th>
              <th class="text-left text-subtitle-2 font-weight-bold">Full Name</th>
              <th class="text-center text-subtitle-2 font-weight-bold" width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in interns"
              :key="item.name"
              :class="{ 'bg-secondary': !index % 2 }"
            >
              <td>
                <v-avatar :image="item.avatar" size="40" class="my-2"></v-avatar>
              </td>
              <td class="text-left text-subtitle-2 font-weight-medium">{{ item.name }}</td>
              <td>
                <v-btn icon="mdi-square-edit-outline" variant="plain"></v-btn>
                <v-btn icon="mdi-delete" variant="plain"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <div class="w-100">
      <div class="w-100">
        <v-pagination
          v-model="page"
          :length="length"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const page = ref(1)
const length = ref(15)
const interns = ref([
  {
    avatar:
      'https://static.wikia.nocookie.net/naruto/images/4/4a/Obito_Uchiha.png/revision/latest/scale-to-width-down/699?cb=20161010144227&path-prefix=pl',
    name: 'John Doe'
  },
  {
    avatar:
      'https://static.wikia.nocookie.net/naruto/images/4/4a/Obito_Uchiha.png/revision/latest/scale-to-width-down/699?cb=20161010144227&path-prefix=pl',
    name: 'Jane Doe'
  }
])

const router = useRouter()

function handleAddUser() {
  router.push({ name: 'add-user' })
}
</script>

<style scoped>
/* Pagination */
:deep(.v-pagination__list) {
  justify-content: start;
}

:deep(.v-pagination__item),
:deep(.v-pagination__prev),
:deep(.v-pagination__next) {
  border: 1px solid #ccc;
  border-right: 0;
  margin: 0;
  color: rgb(var(--v-theme-primary));
  background-color: rgb(var(--v-theme-white));
}

:deep(.v-pagination__next) {
  border-right: 1px solid #ccc;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

:deep(.v-pagination__prev) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

:deep(.v-pagination .v-btn) {
  border-radius: 0;
}

:deep(.v-pagination__item--is-active .v-btn--size-default) {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
}

/* Buttons */
:deep(.v-btn--size-default) {
  --v-btn-height: 24px;
}

/* Searchbox */
:deep(.v-field__outline) {
  --v-field-border-width: 0px;
}

:deep(.v-field__input) {
  --v-field-input-min-height: 30px;
  padding: 6px 12px;
  font-size: 16px;
}

:deep(.v-field__overlay) {
  background-color: rgb(var(--v-theme-secondary)) !important;
}

:deep(.v-field__append-inner .v-icon) {
  --v-icon-size-multiplier: 0.9;
}

/* Table */
:deep(.v-btn--variant-plain .v-icon) {
  --v-icon-size-multiplier: 0.8;
}

.v-table .v-table__wrapper > table > thead > tr > th,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
  border-bottom: none;
}
</style>
