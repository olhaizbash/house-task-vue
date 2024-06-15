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
  console.log(response.data)
  return response.data
}

export const createHouse = async (data) => {
  const response = await instance.post('', data)
  console.log(response.data)
  return response.data
}

export const uploadImageHouse = async (houseId, data) => {
  const response = await instance.post(`${houseId}/upload`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(response.data)
  return response.data
}

export const deleteHouse = async (houseId) => {
  const response = await instance.delete(`${houseId}`)
  console.log(response.data)
  return response.data
}
