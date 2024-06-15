<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import FilterButtons from '../components/FilterButtons.vue'
import SearchComponent from '../components/SearchComponent.vue'
import HouseListComponent from '../components/HouseListComponent.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getHouses } from '@/api/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToCreate = () => {
  router.push({ name: 'create listing' })
}

const houses = ref([])

const removeHouse = (id) => {
  houses.value = houses.value.filter((house) => house.id !== id)
}

onMounted(async () => {
  try {
    houses.value = await getHouses()
  } catch (error) {
    console.error('Error fetching API data:', error)
  }
})

const query = ref('')

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

const buttonColor = computed(() => (isDesktop.value ? 'var(--element-primary)' : 'transparent'))
const buttonText = computed(() => isDesktop.value && 'Create new')
const buttonImgSrc = computed(() =>
  isDesktop.value ? '/src/assets/img/ic_plus_white@3x.png' : '/src/assets/img/ic_plus_grey@3x.png'
)
</script>

<template>
  <main>
    <section class="houses">
      <div class="container">
        <div class="house-overlay">
          <div class="houses-control-wrapper">
            <div class="home">
              <h1>Houses</h1>
              <ButtonComponent
                class="create-btn"
                :bgColor="buttonColor"
                :text="buttonText"
                :imgSrc="buttonImgSrc"
                :imgAlt="`Create house`"
                @click="goToCreate"
              />
            </div>
            <div class="query-wrapper">
              <SearchComponent type="text" v-model="query" placeholder="Search for a house" />
              <FilterButtons />
            </div>
          </div>
          <HouseListComponent :houses="houses" @updateHouses="removeHouse" />
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;

  @media screen and (min-width: 768px) {
    justify-content: space-between;
    position: static;
  }
}

.create-btn {
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (min-width: 768px) {
    position: static;
  }
}

.houses {
  padding-top: 50px;
  padding-bottom: 70px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

h1 {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
}

.query-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 0px;
    justify-content: space-between;
  }
}

.houses-control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 768px) {
    gap: 40px;
  }
}

.house-overlay {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
