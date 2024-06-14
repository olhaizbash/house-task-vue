<script setup>
import { ref } from 'vue'
const focus = ref(false)

const handleFocus = (e) => {
  focus.value = true
}

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
  },
  error: {
    type: String,
    required: false,
    default: 'Required fiels missing'
  }
})
</script>

<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      @blur="handleFocus"
      focused="focus.toString()"
    />
    <span>{{ error }}</span>
  </div>
</template>

<style scoped>
label {
  color: var(--text-secondary);
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
}
span {
  color: var(--element-primary);
  display: none;
}
div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
input {
  padding: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--element-background2);
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--text-dark);

  &:invalid[focused='true'] {
    border: 1px solid var(--element-primary);
  }

  &:invalid[focused='true'] ~ span {
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 14px;
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
</style>
