<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  },
  error: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <div class="input-wrapper">
    <label class="input-label" v-if="label">{{ label }}</label>
    <input
      class="input"
      :class="{ error: error }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
.input-label {
  color: var(--text-secondary);
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.input {
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

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

.input.error {
  border: 1px solid var(--element-primary);
}

.input::placeholder {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}
</style>
