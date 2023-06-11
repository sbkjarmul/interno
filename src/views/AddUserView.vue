<template>
  <add-edit-user-layout>
    <template #title>{{ addEditUserContent.addUser }}</template>
    <template #action-buttons>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0"
        @click="handleAddUser"
        >{{ addEditUserContent.addUser }}
      </v-btn>
    </template>
    <template #change-photo-button>
      <v-btn
        prepend-icon="mdi-camera"
        variant="outlined"
        class="text-capitalize letter-spacing-0 text-darken1"
        block
        @click="handleChangePhoto"
      >
        {{ addEditUserContent.changePhoto }}
      </v-btn>
    </template>
  </add-edit-user-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useUsers from '@composables/useUsers'
import content from '@/assets/content.json'
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'

const addEditUserContent = content.views.addEditUser

const router = useRouter()
const { createUser } = useUsers()

function handleAddUser() {
  const user = {
    firstName: 'Sebek',
    lastName: 'Sebek',
    email: 'sbkjarmul@wp.pl',
    avatar: 'http://obrazk.pl'
  }
  createUser(user).then(() => {
    router.push({ name: 'user-list' })
  })
}

function handleChangePhoto() {
  console.log('Change photo')
}
</script>
