<script setup>
import HouseItemComponent from './HouseItemComponent.vue'

defineProps({
  houses: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <ul>
    <HouseItemComponent v-for="house in houses" :key="house.id" :house="house" />
  </ul>
</template>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
