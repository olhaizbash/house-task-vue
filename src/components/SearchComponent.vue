<script setup>
import { useStore } from 'vuex'

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})

const store = useStore()
const emits = defineEmits(['update:modelValue'])

const updateQuery = (e) => {
  emits('update:modelValue', e.target.value)
  store.commit('SET_FILTER', e.target.value)
}

const resetQuery = (e) => {
  emits('update:modelValue', '')
  store.commit('SET_FILTER', '')
}
</script>

<template>
  <form class="search-form">
    <label v-if="label">{{ label }}</label>
    <button class="search-btn"><img class="icon" src="@/assets/img/ic_search@3x.png" /></button>
    <input
      class="search-input"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateQuery"
      v-bind="$attrs"
    />
    <button v-if="modelValue.length > 0" class="delete-search-btn" @click="resetQuery">
      <img class="icon" src="@/assets/img/ic_clear@3x.png" />
    </button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 300px;
  }
}

.search-input {
  padding: 10px 40px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--element-tertiary-light);
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
    max-width: 300px;
  }
}

.search-input::placeholder {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

.icon {
  width: 15px;
  height: 15px;
}

.search-btn {
  position: absolute;
  top: 1px;
  left: 10px;
  z-index: 2;
  background-color: transparent;
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

.delete-search-btn {
  position: absolute;
  top: 1px;
  right: 10px;
  z-index: 2;
  background-color: transparent;
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
</style>
