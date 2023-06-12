<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/composables'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import MainLayout from '@/layouts/MainLayout.vue'
import content from '@/assets/content.json'

const userListContent = content.views.userList

const search = ref('')
const page = ref(1)

const router = useRouter()
const { deleteUser, error } = useUsers()
const userStore = useUserStore()
const { deleteCachedUser, loadPage } = userStore
const { totalPages, pagedUsers } = storeToRefs(userStore)

watchEffect(() => {
    resetPage()
    loadPage(page.value, search.value)
})

function resetPage() {
    page.value = search.value !== '' ? 1 : page.value
}

function handleAddButtonClick() {
    router.push({ name: 'add-user' })
}

function handleEditIconClick(userId) {
    router.push({ name: 'edit-user', params: { id: userId } })
}

function handleDeleteIconClick(userId) {
    if (!userId) return

    deleteUser(userId).then(() => {
        if (error.value) return

        deleteCachedUser(userId)
        router.push({ name: 'user-list' })
    })
}
</script>

<template>
    <MainLayout>
        <template #title>{{ userListContent.title }}</template>

        <template #topbar>
            <div class="w-100">
                <v-text-field
                    v-model="search"
                    :placeholder="userListContent.searchForUsers"
                    variant="outlined"
                    append-inner-icon="mdi-magnify"
                >
                </v-text-field>
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
                >
                    {{ userListContent.addUser }}
                </v-btn>
            </div>
        </template>

        <template #main>
            <v-table v-if="pagedUsers.length">
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
                        v-for="(item, index) in pagedUsers"
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
                                @click="() => handleEditIconClick(item.id)"
                            >
                            </v-btn>
                            <v-btn
                                icon="mdi-delete"
                                variant="plain"
                                @click="() => handleDeleteIconClick(item.id)"
                            >
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <template v-else>
                <p>
                    {{ userListContent.noMatch }}
                </p>
                <p>{{ userListContent.checkNextOrPreviousPage }}</p>
            </template>
        </template>

        <template #bottom>
            <v-pagination
                v-model="page"
                :length="totalPages"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
            ></v-pagination>
        </template>
    </MainLayout>
</template>

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
