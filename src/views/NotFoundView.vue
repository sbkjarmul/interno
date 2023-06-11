<template>
  <div class="d-flex flex-column justify-center h-100">
    <h1 class="m-0 text-h4">404 - Page not found</h1>
    <div class="mt-5">
      <v-btn
        variant="flat"
        class="bg-primary text-capitalize letter-spacing-0"
        @click="handleBackToUserList"
        >Back to user list</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBackToUserList = () => {
  router.push({ name: 'user-list' })
}
</script>
