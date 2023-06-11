<template>
  <div class="d-flex justify-space-between flex-column h-100">
    <div class="w-100 text-start">
      <h1 class="m-0 text-h4">{{ userListContent.title }}</h1>
    </div>

    <div class="my-5 px-sm-5 py-10 h-100 shadow rounded bg-white">
      <div class="d-flex flex-column flex-sm-row pb-3 px-2 px-sm-0">
        <div class="w-100">
          <v-text-field
            v-model="search"
            :placeholder="userListContent.searchForUsers"
            variant="outlined"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
        <div class="w-100 d-flex justify-end">
          <v-btn
            prepend-icon="mdi-plus"
            variant="flat"
            size="large"
            density="comfortable"
            rounded="xl"
            class="bg-primary text-capitalize letter-spacing-0"
            @click="handleAddButtonClick"
            >{{ userListContent.addUser }}</v-btn
          >
        </div>
      </div>

      <v-divider class="mb-3"></v-divider>

      <v-table v-if="filteredUsers.length">
        <thead>
          <tr>
            <th class="text-left" width="10%"></th>
            <th class="text-left text-subtitle-2 font-weight-bold">
              {{ userListContent.fullName }}
            </th>
            <th class="text-center text-subtitle-2 font-weight-bold" width="100px">
              {{ userListContent.actions }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredUsers"
            :key="item.id"
            :class="{ 'bg-secondary': !(index % 2) }"
          >
            <td class="text-left">
              <v-avatar :image="item.avatar" size="32" class="my-2"></v-avatar>
            </td>
            <td class="text-left text-subtitle-2 font-weight-medium">
              {{ `${item.firstName} ${item.lastName}` }}
            </td>
            <td>
              <v-btn
                icon="mdi-square-edit-outline"
                variant="plain"
                @click="() => handleEditIconClick(item)"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                variant="plain"
                @click="() => handleDeleteIconClick(item?.id)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <template v-else>
        <p>
          {{ userListContent.noMatch }} "<b>{{ search }}"</b>
        </p>
        <p>{{ userListContent.checkNextOrPreviousPage }}</p>
      </template>
    </div>

    <div class="w-100">
      <div class="w-100">
        <v-pagination
          v-model="page"
          :length="totalPages"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import useUsers from '@composables/useUsers'
import content from '@/assets/content.json'

const userListContent = content.views.userList
const users = ref([])
const search = ref('')
const page = ref(1)
const totalPages = ref(0)

const router = useRouter()
const { getAllUsers, deleteUser } = useUsers()

const filteredUsers = computed(() =>
  users.value.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const searchValue = search.value.toLowerCase()

    if (fullName.includes(searchValue)) {
      return user
    }
  })
)

watchEffect(() => {
  console.log('rerender UserListView')
  getAllUsers({ page: page.value }).then((res) => {
    users.value = [...res.data]
    totalPages.value = res.totalPages
  })
})

function handleAddButtonClick() {
  router.push({ name: 'add-user' })
}

function handleEditIconClick(userId) {
  router.push({ name: 'edit-user', params: userId })
}

function handleDeleteIconClick(userId) {
  if (!userId) return

  deleteUser(userId).then((res) => {
    if (res.status > 200 && res.status < 300) {
      removeCachedUser(userId)
      router.push({ name: 'user-list' })
    }
  })
}

function removeCachedUser(userId) {
  const index = users.value.findIndex((user) => user.id === userId)

  if (index === -1) return

  users.value.splice(index, 1)
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
  --v-btn-height: 16px;
  font-size: 12px;
}

:deep(.v-btn--density-comfortable) {
  font-size: 12px;
}

:deep(.v-btn__prepend) {
  margin-right: 4px;
}

:deep(.v-pagination .v-btn) {
  font-size: 14px;
}

/* Searchbox */
:deep(.v-field__outline) {
  --v-field-border-width: 0px;
}

:deep(.v-field__input) {
  --v-field-input-min-height: 30px;
  padding: 4px 12px;
  font-size: 12px;
}

:deep(.v-field__overlay) {
  background-color: rgb(var(--v-theme-secondary)) !important;
}

:deep(.v-field__append-inner .v-icon) {
  --v-icon-size-multiplier: 0.7;
}

/* Table */
:deep(.v-btn--variant-plain .v-icon) {
  --v-icon-size-multiplier: 0.8;
  color: rgb(var(--v-theme-darken1));
}

.v-table .v-table__wrapper > table > thead > tr > th,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
  border-bottom: none;
}

.v-table--density-default > .v-table__wrapper > table > tbody > tr > td,
.v-table--density-default > .v-table__wrapper > table > thead > tr > th {
  height: 36px;
}
</style>
