import api from '@api'

const API_PREFIX = '/users'

const useUsers = () => {
  const getAllUsers = async (params) => {
    const response = await api.get(`${API_PREFIX}`, params)

    if (response.status === 200) {
      return response
    } else {
      return {}
    }
  }

  const getUser = async (id) => {
    const response = await api.get(`${API_PREFIX}/${id}`)

    if (response.status === 200) {
      return response
    } else {
      return {}
    }
  }

  const updateUser = async (id, data) => {
    const response = await api.patch(`${API_PREFIX}/${id}`, data)

    if (response.status === 200) {
      return response
    } else {
      return {}
    }
  }

  const createUser = async (data) => {
    const response = await api.post(`${API_PREFIX}`, data)

    if (response.status === 200) {
      return response
    } else {
      return {}
    }
  }

  const deleteUser = async (id) => {
    const response = await api.delete(`${API_PREFIX}/${id}`)

    if (response.status === 200) {
      return response
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
