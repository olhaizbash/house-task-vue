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
    <ul v-if="visibleHouses.length > 0" class="recommend">
      <HouseItemComponent
        v-for="house in visibleHouses"
        :key="house.id"
        :house="house"
        :recommend="true"
      />
    </ul>
    <div v-if="visibleHouses.length === 0" class="flex-img">
    <img src="/src/assets/img/img_empty_houses@3x.png" alt="Houses not found" />
    <p>Something went wrong... <br></br>We will quickly fix the bugs and get back to you.</p>
  </div>
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
  width: 100%;
  margin: auto;

  @media (min-width: 768px) {
    width: 150px;
  }
}
</style>
