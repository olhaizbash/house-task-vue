<script setup>
import HouseItemComponent from './HouseItemComponent.vue'
import { deleteHouse } from '../api/api.js'

defineProps({
  houses: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['updateHouses'])

const deleteHouseById = async (id) => {
  try {
    await deleteHouse(id)
    emit('updateHouses', id)
  } catch (error) {
    console.error('Error deleting house:', error)
  }
}
</script>
<template>
  <ul>
    <HouseItemComponent
      v-for="house in houses"
      :key="house.id"
      :house="house"
      @deleteHouse="deleteHouseById"
    />
  </ul>
</template>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
