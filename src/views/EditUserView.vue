<template>
  <add-edit-user-layout>
    <template #title>{{ addEditUserContent.editUser }}</template>
    <template #action-buttons>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0 mr-2"
        @click="handleUpdate"
      >
        {{ addEditUserContent.updateDetails }}
      </v-btn>
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0"
        @click="handleDelete"
        >{{ addEditUserContent.deleteUser }}
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
import content from '@/assets/content.json'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUsers from '@composables/useUsers'
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'

const addEditUserContent = content.views.addEditUser

const user = ref(null)

const router = useRouter()
const { getUser, updateUser, deleteUser } = useUsers()

onMounted(() => {
  const { id } = router.currentRoute.value.params

  if (!id) return

  getUser(id).then((res) => {
    user.value = res
  })
})

function handleUpdate() {
  if (!user.value) return
  user.value.firstName = 'Sebek'
  updateUser(user.value).then((res) => {
    console.log(res)
    router.push({ name: 'user-list' })
  })
}

function handleDelete() {
  if (!user.value) return

  deleteUser(user.value.id).then((res) => {
    if (res.status > 200 && res.status < 300) {
      router.push({ name: 'user-list' })
    }
  })
}

function handleChangePhoto() {
  console.log('Change photo')
}
</script>
