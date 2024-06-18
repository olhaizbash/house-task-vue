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
  <ul v-if="houses.length > 0" class="flex">
    <HouseItemComponent
      v-for="house in houses"
      :key="house.id"
      :house="house"
      @deleteHouse="deleteHouseById"
    />
  </ul>
  <div v-if="houses.length === 0" class="flex-img">
    <img src="/src/assets/img/img_empty_houses@3x.png" alt="Houses not found" />
    <p>No results found. <br></br> Prease try another keyword.</p>
  </div>
</template>
<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flex-img {
  display: flex;
  flex-direction: column;
  gap: 10px;
align-self: center;
}

p {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;

  @media (min-width: 768px) {
    font-size: 14px;
  }
}
img{
  width: 300px;
  margin-top: 50px;
  @media (max-width: 350px) {
    width: 250px;
  }
}
</style>
