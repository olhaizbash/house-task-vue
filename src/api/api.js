import axios from 'axios'
import store from '@/store'

const API_KEY = '97nCzvJAVHxSgTbkqG184s0oB2wpKPy-'

const instance = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/houses',
  headers: {
    'X-Api-Key': API_KEY
  }
})

instance.interceptors.request.use(
  (config) => {
    store.commit('SET_LOADING', true)
    return config
  },
  (error) => {
    store.commit('SET_LOADING', false)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    store.commit('SET_LOADING', false)
    return response
  },
  (error) => {
    store.commit('SET_LOADING', false)
    return Promise.reject(error)
  }
)

export const getHouses = async () => {
  const response = await instance.get('')
  console.log(response.data)
  return response.data
}

export const createHouse = async (data) => {
  const response = await instance.post('', data)
  return response.data
}

export const uploadImageHouse = async (houseId, data) => {
  const response = await instance.post(`${houseId}/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const deleteHouse = async (houseId) => {
  const response = await instance.delete(`${houseId}`)
  return response.data
}

export const getHouseById = async (id) => {
  const response = await instance.get(`/${id}`)
  return response.data
}

export const editHouse = async (houseId, data) => {
  const response = await instance.post(`${houseId}`, data)
  return response.data
}
