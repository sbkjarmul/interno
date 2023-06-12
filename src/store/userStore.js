import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUsers } from '@/composables'

const useUsersStore = defineStore('users', () => {
  const cachedUsers = ref([])
  const pagedUsers = ref([])
  const totalPages = ref(0)
  const MAX_USERS_PER_PAGE = 6

  const { getAllUsers } = useUsers()

  function loadUsersToCache(params = { per_page: 12 }) {
    getAllUsers(params).then((response) => {
      cachedUsers.value = response.data
      totalPages.value = response.totalPages
    })
  }

  function loadPage(page = 1) {
    const startIndex = (page - 1) * MAX_USERS_PER_PAGE
    const endIndex = startIndex + MAX_USERS_PER_PAGE
    pagedUsers.value = cachedUsers.value.slice(startIndex, endIndex)
    totalPages.value = Math.ceil(cachedUsers.value.length / MAX_USERS_PER_PAGE)
  }

  function getCachedUser(userId) {
    return cachedUsers.value.find((user) => user.id === userId)
  }

  function addCachedUser(user) {
    cachedUsers.value.push(user)
  }

  function deleteCachedUser(userId) {
    cachedUsers.value = cachedUsers.value.filter((user) => user.id !== userId)
  }

  function updateCachedUser(user) {
    cachedUsers.value = cachedUsers.value.map((cachedUser) => {
      if (cachedUser.id === user.id) {
        return user
      }
      return cachedUser
    })
  }

  return {
    cachedUsers,
    pagedUsers,
    totalPages,
    loadUsersToCache,
    loadPage,
    getCachedUser,
    addCachedUser,
    deleteCachedUser,
    updateCachedUser
  }
})

export default useUsersStore
