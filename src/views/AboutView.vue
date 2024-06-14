<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
</script>

<template>
  <main>
    <section class="about">
      <div class="container">
        <h1 v-if="!isDesktop" class="about-title">About</h1>
        <div class="wrapper">
          <h2 class="subtitle">About DDT Real Estate</h2>
          <p class="about-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, suscipit eum
            reprehenderit delectus officia mollitia in modi quos itaque explicabo, quidem ut soluta
            porro aperiam obcaecati molestiae esse pariatur facere.
          </p>
          <p class="about-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque nostrum animi a
            expedita cum minus earum cupiditate exercitationem, amet nesciunt ipsa iusto aut velit
            sequi omnis! Obcaecati quidem molestias nesciunt.
          </p>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <div class="container">
      <div class="footer-wrapper">
        <h2 class="subtitle">Design and Development</h2>
        <div class="footer-info-wrapper">
          <img src="@/assets/img/img_logo_dtt@3x.png" alt="logo" />
          <div class="footer-link-wrapper">
            <p>By DDT</p>
            <a href="https://www.d-tt.nl/">www.d-tt.nl</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import './../assets/styles/main.css';

.about {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-top: 150px;
    padding-bottom: 150px;
  }
}

.about-title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
}

.subtitle {
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;

  @media screen and (min-width: 768px) {
    font-size: 22px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.footer-info-wrapper {
  display: flex;
  gap: 15px;

  @media screen and (min-width: 768px) {
    gap: 30px;
  }
}

.footer-info-wrapper img {
  width: 100px;
  @media screen and (min-width: 768px) {
    width: 160px;
  }
}

.footer-link-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-link-wrapper a {
  color: var(--text-hyperlink);
}

.about-text {
  width: 100%;
  word-break: break-all;
}
</style>
