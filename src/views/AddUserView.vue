<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/composables'
import { useUserStore } from '@/store'
import content from '@/assets/content.json'
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'

const addEditUserContent = content.views.addEditUser

const firstName = ref('')
const lastName = ref('')
const avatar = ref('')
const dialog = ref(false)

const router = useRouter()
const { createUser, error } = useUsers()
const userStore = useUserStore()
const { addCachedUser } = userStore

function handleAddUser() {
    const newUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        avatar: avatar.value
    }

    createUser(newUser).then((user) => {
        if (error.value) return
        addCachedUser(user)
        router.push({ name: 'user-list' })
    })
}

function handleChangePhoto() {
    dialog.value = false
}
</script>

<template>
    <add-edit-user-layout>
        <template #title>{{ addEditUserContent.addUser }}</template>

        <template #text-fields>
            <div class="w-100 w-md-50 mr-2 d-flex flex-column justify-start align-start">
                <label class="font-weight-bold mb-2 text-subtitle-2 text-dark" for="firstName">
                    {{ addEditUserContent.firstName }}
                </label>
                <v-text-field
                    name="firstName"
                    :placeholder="addEditUserContent.enterFirstName"
                    variant="outlined"
                    class="w-100"
                    v-model="firstName"
                >
                </v-text-field>
            </div>
            <div class="w-100 w-md-50 ml-0 ml-md-2 d-flex flex-column justify-start align-start">
                <label class="font-weight-bold mb-2 text-subtitle-2 text-dark" for="firstName">
                    {{ addEditUserContent.lastName }}
                </label>
                <v-text-field
                    name="lastName"
                    :placeholder="addEditUserContent.enterLastName"
                    variant="outlined"
                    class="w-100"
                    v-model="lastName"
                >
                </v-text-field>
            </div>
        </template>

        <template #action-buttons>
            <v-btn
                variant="flat"
                class="bg-primary text-capitalize letter-spacing-0"
                @click="handleAddUser"
                :disabled="!firstName || !lastName || !avatar"
                >{{ addEditUserContent.addUser }}
            </v-btn>
        </template>

        <template #avatar>
            <v-avatar :image="avatar" size="100" class="border-secondary outline mb-5"></v-avatar>
        </template>

        <template #change-photo-button>
            <v-dialog v-model="dialog" width="300px">
                <template v-slot:activator="{ props }">
                    <v-btn
                        prepend-icon="mdi-camera"
                        variant="outlined"
                        class="text-capitalize letter-spacing-0 text-darken1"
                        block
                        v-bind="props"
                    >
                        {{ addEditUserContent.changePhoto }}
                    </v-btn>
                </template>

                <v-card class="pa-5">
                    <v-card-text class="text-center">
                        {{ addEditUserContent.enterPhotoUrl }}
                    </v-card-text>
                    <v-text-field
                        name="avatar"
                        :placeholder="addEditUserContent.enterPhotoUrl"
                        variant="outlined"
                        class="w-100"
                        v-model="avatar"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn color="primary" block @click="handleChangePhoto">
                            {{ addEditUserContent.ok }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </add-edit-user-layout>
</template>

<style scoped>
/* Input */
:deep(.v-field__input) {
    --v-field-input-min-height: 30px;
    padding: 4px 14px;
    font-size: 12px;
}

:deep(.v-field__outline) {
    opacity: 0.4;
}

/* Change photo button */
:deep(.v-btn__prepend) {
    font-size: 10px;
    transform: translateY(1px);
    margin-inline-end: 0;
}
</style>
