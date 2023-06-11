<template>
  <add-edit-user-layout>
    <template #title>Edit user</template>
    <template #action-buttons>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0 mr-2"
        @click="handleUpdate"
        >Update details
      </v-btn>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0"
        @click="handleUpdate"
        >Delete user
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
        Change photo
      </v-btn>
    </template>
  </add-edit-user-layout>
</template>

<script setup>
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleUpdate() {
  router.push({ name: 'user-list' })
}

function handleChangePhoto() {
  console.log('Change photo')
}
</script>
