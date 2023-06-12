import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUsers } from '@/composables'

const useUsersStore = defineStore('users', () => {
  const cachedUsers = ref([])
  const totalPages = ref(0)

  const { getAllUsers } = useUsers()

  function loadUsers() {
    getAllUsers().then((response) => {
      cachedUsers.value = response.data
      totalPages.value = response.totalPages
    })
  }

  function addCachedUser(user) {
    cachedUsers.value.push(user)
  }

  function deleteCachedUser(userId) {
    cachedUsers = cachedUsers.filter((user) => user.id !== userId)
  }

  function updateCachedUser(user) {
    cachedUsers = cachedUsers.map((cachedUser) => {
      if (cachedUser.id === user.id) {
        return user
      }
      return cachedUser
    })
  }

  return {
    cachedUsers,
    totalPages,
    loadUsers,
    addCachedUser,
    deleteCachedUser,
    updateCachedUser
  }
})

export default useUsersStore
