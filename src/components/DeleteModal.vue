<script setup>
import { onMounted, onUnmounted } from 'vue';
import ButtonComponent from './ButtonComponent.vue'

defineProps({
    modelValue:{
        type: Boolean,
        required:  true,
        default: false
    }
})

const emits = defineEmits(['update:modelValue', 'confirmDelete']);

const confirmDelete = () => {
  emits('confirmDelete');
};

const closeModal = ()=>{
    emits('update:modelValue', false)
}

const handleClose = (e)=>{
        if(e.key === 'Escape'){
            closeModal()
        }
    }

onMounted(()=>{
    window.addEventListener('keyup', handleClose )
})

onUnmounted(()=>{
    window.removeEventListener('keyup', handleClose )
})
</script>
<template>
  <div class="overlay">
    <div class="modal-content">
      <h1 class="delete-title">Delete listing</h1>
      <p class="delete-p">Are you sure you want to delete this listing? <br></br>This action can not be undone.</p>

      <ButtonComponent 
      :text="`Yes, delete`" 
      :bgColor="`var(--element-primary)`" 
      :width="`100%`" 
      @click="confirmDelete"/>
      <ButtonComponent 
      :text="`Go back`" 
      :bgColor="`var(--element-secondary)`" 
      :width="`100%`" 
      @click="closeModal"
      />
    </div>
  </div>
</template>
<style scoped>
@import './../assets/styles/main.css';

.modal-content {
  background-color: var(--element-background2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 20%;
  gap: 20px;
  padding: 50px;
  height: 200px;
  border-radius: 8px;
  translate: -50% -50%;
  position: fixed;
  top: 50%;
  left: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 60;

  @media screen and (min-width: 768px) {
    width: 400px;
    height: 300px;
    gap: 20px;
  }
}

.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 60;
}

.delete-title {
  color: var(--text-primary);
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
}

.delete-p{
    text-align: center;
    margin-bottom: 20px;
}
</style>
