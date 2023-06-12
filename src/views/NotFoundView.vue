<script setup>
import { useRouter } from 'vue-router'
import content from '@/assets/content.json'

const notFoundContent = content.views.notFound

const router = useRouter()

const handleBackToUserList = () => {
    router.push({ name: 'user-list' })
}
</script>

<template>
    <div class="d-flex flex-column justify-center h-100">
        <h1 class="m-0 text-h4">{{ notFoundContent.title }}</h1>
        <p>{{ notFoundContent.message }}</p>
        <div class="mt-5">
            <v-btn
                variant="flat"
                class="bg-primary text-capitalize letter-spacing-0"
                @click="handleBackToUserList"
            >
                {{ notFoundContent.backToUserList }}
            </v-btn>
        </div>
    </div>
</template>
