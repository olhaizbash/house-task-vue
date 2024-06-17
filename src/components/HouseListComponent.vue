<script setup>
import HouseItemComponent from './HouseItemComponent.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const houses = computed(() => store.getters.getHousesFiltered)

const deleteHouseById = async (id) => {
  store.dispatch('deleteHouse', id)
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
