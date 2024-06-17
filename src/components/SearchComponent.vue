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
  // @input="$emit('update:modelValue', $event.target.value)"
}
</script>

<template>
  <form>
    <label v-if="label">{{ label }}</label>
    <button class="search-btn"><img src="@/assets/img/ic_search@3x.png" /></button>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateQuery"
      v-bind="$attrs"
    />
    <button
      v-if="modelValue.length > 0"
      class="delete-search-btn"
      @click.stop="store.commit('RESET_FILTER')"
    >
      <img src="@/assets/img/ic_clear@3x.png" />
    </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  position: relative;
}

input {
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

input::placeholder {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

img {
  width: 15px;
  height: 15px;
}

.search-btn {
  position: absolute;
  top: 1px;
  left: 10px;
  z-index: 2;
  background-color: transparent;
}

.delete-search-btn {
  position: absolute;
  top: 1px;
  left: 260px;
  z-index: 2;
  background-color: transparent;
}
</style>
