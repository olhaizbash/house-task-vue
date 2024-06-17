<template>
  <div class="file-input-container" @click="selectFile">
    <input
      type="file"
      ref="fileInput"
      accept="image/png, image/jpeg"
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="!previewUrl" class="placeholder">
      <img src="/src/assets/img/ic_upload@3x.png" alt="Upload Icon" />
    </div>
    <div v-else class="preview">
      <img :src="previewUrl" alt="Selected Image" />
      <ButtonComponent
        class="remove-button"
        :bgColor="`transparent`"
        :imgSrc="`/src/assets/img/ic_clear_white@3x.png`"
        :imgAlt="`Delete image`"
        :borderRadius="`50%`"
        @click.stop="removeFile"
      />
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, File],
    default: null
  },
  edit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const editImageProp = computed(() => (props.edit ? props.modelValue : null))

const previewUrl = ref(editImageProp)

const selectFile = () => {
  console.log(props.modelValue)
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    emit('update:modelValue', file)
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeFile = () => {
  emit('update:modelValue', null)

  previewUrl.value = null
  fileInput.value.value = ''
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      previewUrl.value = null
    }
  }
)
</script>

<style scoped>
.file-input-container {
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder img {
  width: 30px;
  height: 30px;
}

.preview {
  position: relative;
}

.preview img {
  display: block;
  width: 108px;
  height: 108px;
  object-fit: cover;
  border-radius: 8px;
}

.remove-button {
  position: absolute;
  top: -15px;
  right: -15px;
}
</style>
