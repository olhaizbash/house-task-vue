<script setup>
import ButtonComponent from './ButtonComponent.vue'
</script>
<template>
  <div class="filter-wrapper">
    <ButtonComponent
      :text="`Price`"
      :bgColor="`var(--element-primary)`"
      :borderRadius="`8px 0px 0px 8px`"
      :width="`50%`"
      :textTransform="`none`"
    />
    <ButtonComponent
      :text="`Size`"
      :bgColor="`var(--element-tertiary-dark)`"
      :borderRadius="`0px 8px 8px 0px`"
      :width="`50%`"
      :textTransform="`none`"
    />
  </div>
</template>
<style scoped>
.filter-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 250px;
  }
}
</style>
