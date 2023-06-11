<template>
  <add-edit-user-layout>
    <template #title>Add user</template>
    <template #action-buttons>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0"
        @click="handleUpdate"
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
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'
import { useRouter } from 'vue-router'
import content from '@/assets/content.json'

const addEditUserContent = content.views.addEditUser

const router = useRouter()

function handleUpdate() {
  router.push({ name: 'user-list' })
}

function handleChangePhoto() {
  console.log('Change photo')
}
</script>
