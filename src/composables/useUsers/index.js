import { ref } from 'vue'
import api from '@api'
import { UserService } from '@/services'

const API_PREFIX = '/users'

const useUsers = () => {
  const userService = new UserService()

  const cachedUsers = ref([])

  const getAllUsers = async (params) => {
    const response = await api.get(`${API_PREFIX}`, params)
    if (response.status === 200) {
      cachedUsers.value = response.data.data.map((dto) => userService.dtoToUser(dto))

      return {
        data: response.data.data.map((dto) => userService.dtoToUser(dto)),
        totalPages: response.data.total_pages
      }
    } else {
      return {}
    }
  }

  const getUser = async (id) => {
    const response = await api.get(`${API_PREFIX}/${id}`)

    if (response.status === 200) {
      return userService.dtoToUser(response.data.data)
    } else {
      return {}
    }
  }

  const updateUser = async (data) => {
    const dto = userService.userToDto(data)
    const response = await api.patch(`${API_PREFIX}/${dto.id}`, dto)

    if (response.status >= 200 && response.status < 300) {
      const updatedUser = userService.dtoToUser(response.data)
      updateCachedUser(updatedUser)
      return updatedUser
    } else {
      return {}
    }
  }

  const createUser = async (data) => {
    const response = await api.post(`${API_PREFIX}`, data)

    if (response.status === 200) {
      return response.data.data
    } else {
      return {}
    }
  }

  const deleteUser = async (id) => {
    const response = await api.delete(`${API_PREFIX}/${id}`)
    if (response.status >= 200 && response.status < 300) {
      removeCachedUser(id)
      return { status: response.status }
    } else {
      return {}
    }
  }

  function updateCachedUser(updatedUser) {
    const index = cachedUsers.value.findIndex((user) => user.id === updatedUser.id)
    if (index === -1) return

    cachedUsers.value.splice(index, 1, updatedUser)
  }

  function removeCachedUser(userId) {
    const index = cachedUsers.value.findIndex((user) => user.id === userId)

    if (index === -1) return

    cachedUsers.value.splice(index, 1)
  }

  function addCachedUser(user) {
    cachedUsers.value.push(user)
  }

  return {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
    cachedUsers
  }
}

export default useUsers
