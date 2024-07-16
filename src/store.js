import { createStore } from 'vuex'
import {
  getHouses,
  createHouse,
  uploadImageHouse,
  deleteHouse,
  getHouseById,
  editHouse
} from './api/api.js'

const store = createStore({
  state: {
    houses: [],
    house: null,
    houseId: null,
    isLoading: false,
    searchQuery: '',
    filteredHouses: [],
    activeFilter: null
  },
  mutations: {
    SET_HOUSES(state, houses) {
      state.houses = houses
      state.filteredHouses = houses
    },
    SET_HOUSE(state, house) {
      state.house = house
    },
    ADD_HOUSE(state, house) {
      state.houses.push(house)
      state.filteredHouses.push(house)
      state.houseId = house.id
    },
    UPDATE_HOUSE(state, updatedHouse) {
      const index = state.houses.findIndex((h) => h.id === updatedHouse.id)
      if (index !== -1) {
        state.houses.splice(index, 1, updatedHouse)
        state.filteredHouses.splice(index, 1, updatedHouse)
      }
    },
    SET_LOADING(state, loading) {
      state.isLoading = loading
    },
    SET_FILTER(state, query) {
      state.searchQuery = query
      state.filteredHouses = state.houses.filter((el) =>
        el.location.street.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    },
    RESET_FILTER(state) {
      state.filteredHouses = state.houses
    },
    PRICE_FILTER(state) {
      state.filteredHouses = state.houses.sort((house1, house2) => house1.price - house2.price)
      state.activeFilter = 'price'
    },
    SIZE_FILTER(state) {
      state.filteredHouses = state.houses.sort((house1, house2) => house1.size - house2.size)
      state.activeFilter = 'size'
    },
    SET_ACTIVE_FILTER(state, filter) {
      state.activeFilter = filter
    }
  },
  actions: {
    async fetchHouses({ commit }) {
      commit('SET_LOADING', true)
      try {
        const houses = await getHouses()
        commit('SET_HOUSES', houses)
      } catch (error) {
        console.error('Error fetching houses:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchHouseById({ commit }, id) {
      commit('SET_LOADING', true)
      try {
        const house = await getHouseById(id)
        commit('SET_HOUSE', house)
      } catch (error) {
        console.error('Error fetching house:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createHouse({ commit }, houseData) {
      commit('SET_LOADING', true)
      try {
        const newHouse = await createHouse(houseData)
        commit('ADD_HOUSE', newHouse)
      } catch (error) {
        console.error('Error creating house:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async uploadImageHouse({ dispatch, commit }, { houseId, imageData }) {
      commit('SET_LOADING', true)
      try {
        await uploadImageHouse(houseId, imageData)
        dispatch('fetchHouseById', houseId)
      } catch (error) {
        console.error('Error uploading house image:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteHouse({ commit }, houseId) {
      commit('SET_LOADING', true)
      try {
        await deleteHouse(houseId)
      } catch (error) {
        console.error('Error deleting house:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async editHouse({ commit }, { houseId, houseData }) {
      commit('SET_LOADING', true)
      try {
        const updatedHouse = await editHouse(houseId, houseData)
        commit('UPDATE_HOUSE', updatedHouse)
      } catch (error) {
        console.error('Error editing house:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    getHouses: (state) => state.houses,
    getHousesFiltered: (state) => state.filteredHouses,
    getHouse: (state) => state.house,
    getHouseId: (state) => state.houseId,
    isLoading: (state) => state.isLoading,
    searchQuery: (state) =>
      state.houses.filter((el) =>
        el.location.street.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
  }
})

export default store
