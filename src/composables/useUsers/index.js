import { ref } from 'vue'
import api from '@api'
import { UserService } from '@/services'

const API_PREFIX = '/users'

const useUsers = () => {
  const userService = new UserService()
  const error = ref('')
  const loading = ref(false)

  const getAllUsers = async (params) => {
    loading.value = true

    const response = await api.get(`${API_PREFIX}`, params)

    if (response.status === 200) {
      loading.value = false

      return {
        data: response.data.data.map((dto) => userService.dtoToUser(dto)),
        totalPages: response.data.total_pages
      }
    } else {
      loading.value = false
      error.value = response.message
    }
  }

  const getUser = async (id) => {
    loading.value = true

    const response = await api.get(`${API_PREFIX}/${id}`)

    if (response.status === 200) {
      loading.value = false
    } else {
      loading.value = false
      error.value = response.message
    }
  }

  const updateUser = async (data) => {
    loading.value = true

    const dto = userService.userToDto(data)
    const response = await api.patch(`${API_PREFIX}/${dto.id}`, dto)
    if (response.status >= 200 && response.status < 300) {
      loading.value = false
    } else {
      loading.value = false
      error.value = response.message
    }
  }

  const createUser = async (data) => {
    loading.value = true

    const dto = userService.userToDto(data)
    const response = await api.post(`${API_PREFIX}`, dto)

    if (response.status >= 200 && response.status <= 300) {
      const user = userService.dtoToUser(response.data)
      loading.value = false
      return user
    } else {
      loading.value = false
      error.value = response.message
    }
  }

  const deleteUser = async (id) => {
    loading.value = true

    const response = await api.delete(`${API_PREFIX}/${id}`)

    if (response.status >= 200 && response.status < 300) {
      loading.value = false
    } else {
      loading.value = false
      error.value = response.message
    }
  }

  return {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
    error,
    loading
  }
}

export default useUsers
