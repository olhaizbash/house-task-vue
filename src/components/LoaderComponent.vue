<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const visible = computed(() => store.state.isLoading)
</script>
<template>
  <div v-if="visible" class="loader-overlay">
    <div class="loader"></div>
  </div>
</template>
<style scoped>
@import './../assets/styles/main.css';

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid var(--element-primary);
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
