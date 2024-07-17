<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import CreateListingForm from '../components/CreateListingForm.vue'
import LoaderComponent from '../components/LoaderComponent.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const houseById = computed(() => store.getters.getHouse || '')
const isLoading = computed(() => store.getters.isLoading)

const route = useRoute()
const query = computed(() => route.params.id || '')
const isEdit = computed(() => route.name === 'edit listing')

onMounted(() => {
  if (isEdit.value) {
    store.dispatch('fetchHouseById', query.value)
  } else {
    return
  }
})

const router = useRouter()

const goToMain = () => {
  router.push({ name: 'home' })
}

const isDesktop = ref(window.innerWidth >= 768)

const updateView = () => {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  window.addEventListener('resize', updateView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateView)
})

const buttonText = computed(() => isDesktop.value && 'Back to overview')
</script>
<template>
  <section class="create-list">
    <div class="container">
      <div class="create-nav-overlay">
        <ButtonComponent
          class="go-main-btn"
          :bgColor="`transparent`"
          :text="buttonText"
          :imgSrc="`/src/assets/img/ic_back_grey@3x.png`"
          :imgAlt="`button back to main page`"
          :textColor="`var(--text-primary)`"
          :textTransform="`none`"
          @click="goToMain"
        />
        <h1 class="create-title">{{ isEdit ? `Edit listing` : `Create new listing` }}</h1>
      </div>

      <LoaderComponent v-if="isLoading" />

      <div v-if="!isLoading">
        <CreateListingForm :isEdit="isEdit" :houseData="houseById[0]" />
      </div>
    </div>
  </section>
</template>
<style scoped>
@import './../assets/styles/main.css';

.create-list {
  padding-top: 50px;
  padding-bottom: 90px;
  width: 100%;
  background-image: url('/src/assets/img/img_background@3x.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  height: 100vh;

  @media screen and (min-width: 768px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

.create-title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: start;
    font-size: 32px;
  }
}

.create-nav-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;

  @media screen and (min-width: 768px) {
    position: static;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: start;
    height: auto;
  }
}

.go-main-btn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;

  @media screen and (min-width: 768px) {
    position: static;
  }
}
</style>
