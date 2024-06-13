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
