<script setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { loadUsersToCache } = userStore

loadUsersToCache()
</script>

<template>
    <div class="h-100 w-100 pa-5 pa-sm-15">
        <router-view></router-view>
    </div>
</template>

<style scoped></style>
