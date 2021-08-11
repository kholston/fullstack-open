import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (err) {
    return { error: err }
  }
}

export default {
  getAll
}