<script setup>
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
</script>

<template>
  <form>
    <label v-if="label">{{ label }}</label>
    <button><img src="@/assets/img/ic_search@3x.png" /></button>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  position: relative;

  /* @media (min-width: 330px) {
    width: 320px;
  } */
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

button {
  position: absolute;
  top: 1px;
  left: 10px;
  z-index: 2;
  background-color: transparent;
}
</style>
