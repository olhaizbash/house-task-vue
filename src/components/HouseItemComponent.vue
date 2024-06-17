<script setup>
import ButtonComponent from './ButtonComponent.vue'
import DeleteModal from './DeleteModal.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  house: {
    type: Object,
    required: true
  }
})

const isModalOpen = ref(false)

const updateModalOpen = () => {
  isModalOpen.value = true
}

const updateModalClose = () => {
  isModalOpen.value = false
}

const emit = defineEmits(['deleteHouse'])

const confirmDelete = () => {
  emit('deleteHouse', props.house.id)
  updateModalClose()
}

const goToHouseInfo = (id) => {
  router.push({ name: 'house information', params: { id } })
}

const goToEditHouseInfo = (id) => {
  router.push({ name: 'edit listing', params: { id } })
}
</script>
<template>
  <li class="house-item" @click="goToHouseInfo(house.id)">
    <img class="house-image" :src="house.image" :alt="house.location.street" />
    <div class="house-info">
      <h2>{{ house.location.street }} {{ house.location?.houseNumber }}</h2>
      <p class="price">&#8364; {{ house.price }}</p>
      <p>{{ house.location.zip }} {{ house.location.city }}</p>
      <ul class="additional-info">
        <li>
          <img src="@/assets/img/ic_bed@3x.png" alt="bedrooms amount" />
          <p>{{ house.rooms.bedrooms }}</p>
        </li>
        <li>
          <img src="@/assets/img/ic_bath@3x.png" alt="bathrooms amount" />
          <p>{{ house.rooms.bathrooms }}</p>
        </li>
        <li>
          <img src="@/assets/img/ic_size@3x.png" alt="size of the house" />
          <p>{{ house.size }} m&sup2;</p>
        </li>
      </ul>
    </div>
    <div class="house-btn">
      <ButtonComponent
        :imgSrc="`/src/assets/img/ic_edit@3x.png`"
        :imgAlt="`Edit house`"
        :bgColor="`transparent`"
        @click.stop="goToEditHouseInfo(house.id)"
      />
      <ButtonComponent
        :imgSrc="`/src/assets/img/ic_delete@3x.png`"
        :imgAlt="`Delete house`"
        :bgColor="`transparent`"
        @click.stop="updateModalOpen"
      />
    </div>
  </li>
  <DeleteModal v-model="isModalOpen" v-if="isModalOpen" @confirmDelete="confirmDelete" />
</template>
<style scoped>
@import './../assets/styles/main.css';

.house-image {
  display: block;
  border-radius: 8px;
  width: 100px;
  height: 100px;

  @media (max-width: 330px) {
    width: 80px;
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
}

.house-item {
  position: relative;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: self-start;
  gap: 20px;
  background-color: var(--element-background2);
  border-radius: 8px;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
}

.additional-info {
  display: flex;
  justify-content: flex-start;
  align-items: self-start;
  gap: 5px;
}

.additional-info li {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.house-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.house-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 1px;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    top: 20px;
    right: 20px;
  }
}

h2 {
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;

  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
}

p {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

p.price {
  font-weight: 600;
  color: var(--text-primary);
}
</style>
