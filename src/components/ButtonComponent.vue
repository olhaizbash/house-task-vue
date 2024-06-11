<script setup>
defineProps({
  borderRadius: {
    type: String,
    required: false,
    default: '8px'
  },
  textTransform: {
    type: String,
    required: false,
    default: 'uppercase'
  },
  width: {
    type: String,
    required: false,
    default: ''
  },
  bgColor: {
    type: String,
    required: false,
    default: '#FFF'
  },
  text: {
    type: [String, Boolean],
    required: false,
    default: ''
  },
  imgSrc: {
    type: String,
    required: false,
    default: ''
  },
  imgAlt: {
    type: String,
    required: false,
    default: 'Button'
  }
})
</script>

<template>
  <button :style="{ backgroundColor: bgColor, borderRadius: borderRadius, width: width }">
    <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" />
    <span v-if="text" :style="{ textTransform: textTransform }">{{ text }}</span>
  </button>
</template>

<style setup>
@import './../assets/styles/main.css';

button {
  padding: 0;
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    border-radius: 8px;
    border: none;
  }
}

img {
  width: 20px;

  @media (min-width: 768px) {
    width: 15px;
  }
}

span {
  color: var(--element-background2);
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
</style>