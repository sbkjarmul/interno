<script setup>
import { ref } from 'vue'
import useUsers from '@composables/useUsers'

defineProps({
  msg: String
})

const { getAllUsers } = useUsers()
getAllUsers({ page: 3 }).then((res) => {
  console.log(res)
})
</script>

<template>
  <header>
    <h1>Sbk</h1>
  </header>
</template>

<style scoped></style>
