<script setup>
import { computed } from 'vue'

const props = defineProps({
  borderRadius: {
    type: String,
    required: false,
    default: '8px'
  },
  buttonType: {
    type: String,
    required: false,
    default: 'button'
  },
  textTransform: {
    type: String,
    required: false,
    default: 'uppercase'
  },
  textColor: {
    type: String,
    required: false,
    default: 'var(--element-background2)'
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
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const buttonStyle = computed(() => {
  if (props.disabled) {
    return {
      backgroundColor: 'rgba(238, 12, 12, 0.54)',
      borderRadius: props.borderRadius,
      width: props.width,
      cursor: 'not-allowed'
    }
  } else {
    return {
      backgroundColor: props.bgColor,
      borderRadius: props.borderRadius,
      width: props.width
    }
  }
})
</script>

<template>
  <button :style="buttonStyle" :type="buttonType" :disabled="disabled">
    <img v-if="imgSrc" :src="imgSrc" :alt="imgAlt" />
    <span v-if="text" :style="{ textTransform: textTransform, color: textColor }">{{ text }}</span>
  </button>
</template>

<style setup>
@import './../assets/styles/main.css';

button {
  display: flex;
  gap: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 330px) {
    padding: 5px;
  }

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

button:disabled {
  background-color: rgba(238, 12, 12, 0.54);
  color: rgba(255, 255, 255, 0.533);
  cursor: not-allowed;
}
</style>
