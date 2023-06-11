import api from '@api'
import UserService from '@/services/users'

const API_PREFIX = '/users'

const useUsers = () => {
  const userService = new UserService()

  const getAllUsers = async (params) => {
    const response = await api.get(`${API_PREFIX}`, params)
    if (response.status === 200) {
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
      return userService.dtoToUser(response.data)
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
      return { status: response.status }
    } else {
      return {}
    }
  }

  return {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
  }
}

export default useUsers
