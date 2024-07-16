<script setup>
import ButtonComponent from './ButtonComponent.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()

const activeFilter = computed(() => store.state.activeFilter)

const setFilter = (filter) => {
  store.commit(filter === 'price' ? 'PRICE_FILTER' : 'SIZE_FILTER')
}
</script>
<template>
  <div class="filter-wrapper">
    <ButtonComponent
      :text="`Price`"
      :bgColor="
        activeFilter === 'price' ? `var(--element-primary)` : `var(--element-tertiary-dark)`
      "
      :borderRadius="`8px 0px 0px 8px`"
      :width="`50%`"
      :textTransform="`none`"
      @click.stop="setFilter('price')"
    />
    <ButtonComponent
      :text="`Size`"
      :bgColor="activeFilter === 'size' ? `var(--element-primary)` : `var(--element-tertiary-dark)`"
      :borderRadius="`0px 8px 8px 0px`"
      :width="`50%`"
      :textTransform="`none`"
      @click.stop="setFilter('size')"
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
