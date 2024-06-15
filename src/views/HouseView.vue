<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { getHouseById } from '@/api/api'

const route = useRoute()
const query = computed(() => route.params.id || '')
const houseById = ref('')

onMounted(async () => {
  try {
    houseById.value = await getHouseById(query.value)
  } catch (error) {
    console.error('Error fetching API data:', error)
  }
})

const goToMain = () => {
  route.push({ name: 'home' })
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
const imgSrc = computed(() =>
  isDesktop.value ? `/src/assets/img/ic_back_grey@3x.png` : `/src/assets/img/ic_back_white@3x.png`
)
const imgSrcEdit = computed(() =>
  isDesktop.value ? `/src/assets/img/ic_edit@3x.png` : `/src/assets/img/ic_edit_white@3x.png`
)
const imgSrcDelete = computed(() =>
  isDesktop.value ? `/src/assets/img/ic_delete@3x.png` : `/src/assets/img/ic_delete_white@3x.png`
)
const hasGarage = computed(() => (houseById.value[0].hasGarage ? 'Yes' : 'No'))
</script>
<template>
  <section v-if="houseById">
    <div class="container-house">
      <div class="wrapper">
        <ButtonComponent
          class="go-main-btn"
          :bgColor="`transparent`"
          :text="buttonText"
          :imgSrc="imgSrc"
          :imgAlt="`button back to main page`"
          :textColor="`var(--text-primary)`"
          :textTransform="`none`"
          @click="goToMain"
        />
        <div class="overlay">
          <div class="image-bg">
            <img :src="houseById[0].image" alt="house image" />
          </div>
          <div class="house-info">
            <h1 class="title">
              {{ houseById[0].location.street }} {{ houseById[0].location.houseNumber }}
            </h1>
            <ul class="general-list">
              <li class="general-item">
                <img src="/src/assets/img/ic_location@3x.png" />
                <p>{{ houseById[0].location.zip }} {{ houseById[0].location.city }}</p>
              </li>
              <li class="general-item">
                <ul class="sub-list">
                  <li class="general-item">
                    <img src="/src/assets/img/ic_price@3x.png" />
                    <p>{{ houseById[0].price }}</p>
                  </li>
                  <li class="general-item">
                    <img src="/src/assets/img/ic_size@3x.png" />
                    <p>{{ houseById[0].size }} m&sup2;</p>
                  </li>
                  <li class="general-item">
                    <img src="/src/assets/img/ic_construction_date@3x.png" />
                    <p>Built in {{ houseById[0].constructionYear }}</p>
                  </li>
                </ul>
              </li>
              <li class="general-item">
                <ul class="sub-list">
                  <li class="general-item">
                    <img src="/src/assets/img/ic_bed@3x.png" />
                    <p>{{ houseById[0].rooms.bedrooms }}</p>
                  </li>
                  <li class="general-item">
                    <img src="/src/assets/img/ic_bath@3x.png" />
                    <p>{{ houseById[0].rooms.bathrooms }}</p>
                  </li>
                  <li class="general-item">
                    <img src="/src/assets/img/ic_garage@3x.png" />
                    <p>{{ hasGarage }}</p>
                  </li>
                </ul>
              </li>
            </ul>
            <p>{{ houseById[0].description }}</p>
            <div class="house-btn">
              <ButtonComponent
                :imgSrc="imgSrcEdit"
                :imgAlt="`Edit house`"
                :bgColor="`transparent`"
              />
              <ButtonComponent
                :imgSrc="imgSrcDelete"
                :imgAlt="`Delete house`"
                :bgColor="`transparent`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import './../assets/styles/main.css';
section {
  padding-bottom: 70px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

.container-house {
  margin: 0 auto;

  @media (max-width: 330px) {
    max-width: 320px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
    padding-left: 100px;
    padding-right: 100px;
  }
}
.go-main-btn {
  z-index: 50;
  position: absolute;
  top: 30px;
  left: 0;

  @media screen and (min-width: 768px) {
    position: static;
  }
}
.wrapper {
  position: relative;

  @media screen and (min-width: 768px) {
    position: static;
  }
}

.overlay {
  display: flex;
  flex-direction: column;
}

.image-bg {
  width: 100%;
  height: 100%;
  z-index: -1;

  @media screen and (min-width: 768px) {
    position: static;
    height: 100%;
  }
}

.image-bg img {
  width: 100%;
  height: 100%;
}

.house-info {
  background-color: var(--element-background2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 40px 40px 0 0;
  position: static;

  @media screen and (min-width: 768px) {
    position: relative;
    border-radius: 0;
    translate: 0;
  }
}

.general-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.general-item {
  display: flex;
  gap: 10px;
}

.sub-list {
  display: flex;
  gap: 10px;
}

.title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: start;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
}

p {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--text-secondary);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}
.house-btn {
  position: absolute;
  height: 40px;
  top: 30px;
  right: -1px;
  display: flex;
  gap: 1px;
  justify-content: center;
  align-items: center;
  z-index: 60;

  @media screen and (min-width: 768px) {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
