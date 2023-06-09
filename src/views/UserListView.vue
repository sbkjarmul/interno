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
            >Add user</v-btn
          >
        </div>
      </div>
      <v-divider></v-divider>
      <div>
        <v-table :style="{ borderCollapse: 'collapse', borderSpacing: 0 }">
          <thead>
            <tr>
              <th class="text-left" width="10%"></th>
              <th class="text-left text-subtitle-2 font-weight-bold">Full Name</th>
              <th class="text-center text-subtitle-2 font-weight-bold" width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in interns" :key="item.name">
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
</script>

<style scoped>
/* Pagination */
::v-deep(.v-pagination__list) {
  justify-content: start;
}

::v-deep(.v-pagination__item),
::v-deep(.v-pagination__prev),
::v-deep(.v-pagination__next) {
  border: 1px solid #ccc;
  border-right: 0;
  margin: 0;
  color: rgb(var(--v-theme-primary));
  background-color: rgb(var(--v-theme-white));
}

::v-deep(.v-pagination__next) {
  border-right: 1px solid #ccc;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

::v-deep(.v-pagination__prev) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

::v-deep(.v-pagination .v-btn) {
  border-radius: 0;
}

::v-deep(.v-pagination__item--is-active .v-btn--size-default) {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));
}

/* Buttons */
::v-deep(.v-btn--size-default) {
  --v-btn-height: 24px;
}

/* Searchbox */
::v-deep(.v-field__outline) {
  --v-field-border-width: 0px;
}

::v-deep(.v-field__input) {
  --v-field-input-min-height: 30px;
  padding: 6px 12px;
  font-size: 16px;
}

::v-deep(.v-field__overlay) {
  background-color: rgb(var(--v-theme-secondary));
}

::v-deep(.v-field--variant-outlined .v-field--focused) {
  border-color: rgb(var(--v-theme-primary));
}

::v-deep(.v-field__append-inner .v-icon) {
  --v-icon-size-multiplier: 0.9;
}

/* Table */
::v-deep(.v-btn--variant-plain .v-icon) {
  --v-icon-size-multiplier: 0.8;
}
</style>
