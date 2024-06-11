<script setup>
defineProps({
  house: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <li>{{ house }}</li>
</template>
<style scoped></style>
