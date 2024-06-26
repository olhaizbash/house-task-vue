import axios from 'axios'

const API_KEY = '97nCzvJAVHxSgTbkqG184s0oB2wpKPy-'

const instance = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api/houses',
  headers: {
    'X-Api-Key': API_KEY
  }
})

export const getHouses = async () => {
  const response = await instance.get('')
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
