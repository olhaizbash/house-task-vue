<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

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

const route = useRoute()
const isAboutActive = computed(() => route.path === '/about')
</script>

<template>
  <header class="header" :class="{ desktop: isDesktop, mobile: !isDesktop }">
    <div class="container">
      <div v-if="isDesktop" class="desktop-header">
        <img src="@/assets/img/img_logo_dtt@3x.png" alt="Logo" class="logo" />
        <nav>
          <RouterLink to="/" class="nav-link" :class="{ active: !isAboutActive }"
            >Houses</RouterLink
          >
          <RouterLink to="/about" class="nav-link" :class="{ active: isAboutActive }"
            >About</RouterLink
          >
        </nav>
      </div>
      <div v-else class="mobile-header">
        <RouterLink to="/" class="icon" :class="{ active: !isAboutActive }">
          <img
            v-if="!isAboutActive"
            src="@/assets/img/ic_mobile_navigarion_home_active@3x.png"
            alt="Home"
          />
          <img v-else src="@/assets/img/ic_mobile_navigarion_home@3x.png" alt="Home" />
        </RouterLink>
        <RouterLink to="/about" class="icon" :class="{ active: isAboutActive }">
          <img
            v-if="isAboutActive"
            src="@/assets/img/ic_mobile_navigarion_info_active@3x.png"
            alt="About"
          />
          <img v-else src="@/assets/img/ic_mobile_navigarion_info@3x.png" alt="About" />
        </RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
@import './../assets/styles/main.css';

.header {
  position: fixed;
  width: 100%;
  background-color: var(--element-background2);
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  left: 0;
  z-index: 50;

  @media screen and (max-width: 767px) {
    bottom: 0;
    z-index: 50;
  }

  @media screen and (min-width: 768px) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    top: 0;
  }
}

.desktop-header {
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  padding: 20px 0px;
  width: 100%;
}

.desktop-header .logo {
  width: 100px;
}

.desktop-header nav {
  display: flex;
  gap: 50px;
}

.nav-link {
  color: var(--element-tertiary-dark);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

.nav-link.router-link-active {
  color: var(--text-primary);
  font-weight: 700;
}

.nav-link.active {
  color: var(--text-primary);
  font-weight: 700;
}

.mobile-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.icon img {
  width: 40px;
  height: 40px;
}
</style>
