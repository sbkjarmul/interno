<script setup>
import content from '@/assets/content.json'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useUsers from '@composables/useUsers'
import AddEditUserLayout from '@/layouts/AddEditUserLayout.vue'

const addEditUserContent = content.views.addEditUser

const user = ref(null)

const firstName = computed(() => user.value?.firstName || '')
const lastName = computed(() => user.value?.lastName || '')
const avatar = computed(() => user.value?.avatar || 'https://i.pravatar.cc/300')

const router = useRouter()
const { getUser, updateUser, deleteUser } = useUsers()

onMounted(() => {
  const { id } = router.currentRoute.value.params

  if (!id) return

  getUser(id).then(async (res) => {
    user.value = res
  })
})

function handleUpdate() {
  if (!user.value) return
  user.value.firstName = 'Sebek'

  updateUser(user.value).then(() => {
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
          :value="firstName"
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
          :value="lastName"
        ></v-text-field>
      </div>
    </template>

    <template #avatar>
      <v-avatar :image="avatar" size="100" class="border-secondary outline mb-5"></v-avatar>
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
