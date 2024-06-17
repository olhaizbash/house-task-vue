<script setup>
import HouseItemComponent from './HouseItemComponent.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const houses = computed(() => store.getters.getHouses)
const visibleHouses = ref(houses.value.slice(0, 3))
</script>
<template>
  <div class="wrapper-recomended">
    <h2>Recommended for you</h2>
    <ul class="recommend">
      <HouseItemComponent
        v-for="house in visibleHouses"
        :key="house.id"
        :house="house"
        :recommend="true"
      />
    </ul>
  </div>
</template>
<style scoped>
@import './../assets/styles/main.css';
h2 {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: start;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
}

.wrapper-recomended {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 20px;
  padding-right: 20px;
}

.recommend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
