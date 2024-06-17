<script setup>
import ButtonComponent from './ButtonComponent.vue'
import BaseInput from './BaseInput.vue'
import ImageInput from './ImageInput.vue'
import { reactive, computed, watchEffect } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { createHouse, uploadImageHouse, editHouse } from '../api/api.js'

const router = useRouter()

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true,
    default: false
  },
  houseData: {
    type: [Object, Boolean],
    default: () => ({})
  }
})

const formData = reactive({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  image: '',
  price: '',
  constructionYear: '',
  size: '',
  hasGarage: '',
  bedrooms: '',
  bathrooms: '',
  description: ''
})

watchEffect(() => {
  if (props.isEdit) {
    if (props.houseData && Object.keys(props.houseData).length > 0) {
      formData.streetName = props.houseData?.location?.street || ''
      formData.houseNumber = props.houseData?.location?.houseNumber || ''
      formData.numberAddition = props.houseData?.location?.houseNumberAddition || ''
      formData.zip = props.houseData?.location?.zip || ''
      formData.city = props.houseData?.location?.city || ''
      formData.image = props.houseData?.image || ''
      formData.price = props.houseData?.price || ''
      formData.constructionYear = props.houseData?.constructionYear || ''
      formData.size = props.houseData?.size || ''
      formData.hasGarage = props.houseData?.hasGarage || false
      formData.bedrooms = props.houseData?.rooms?.bedrooms || ''
      formData.bathrooms = props.houseData?.rooms?.bathrooms || ''
      formData.description = props.houseData?.description || ''
    }
  }
})

const rules = computed(() => {
  return {
    streetName: {
      required
    },
    houseNumber: { required },

    zip: { required },
    city: { required },
    image: { required },
    price: { required },
    constructionYear: { required },
    size: { required },
    hasGarage: { required },
    bedrooms: { required },
    bathrooms: { required },
    description: { required }
  }
})

const v$ = useVuelidate(rules, formData)

const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = ''
  })
  v$.value.$reset()
}

const goToHouseInfo = (id) => {
  router.push({ name: 'house information', params: { id } })
}

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    const submittedData = { ...formData }
    console.log('Form submitted', submittedData)
    if (props.isEdit) {
      try {
        const houseResponse = await editHouse(props.houseData.id, {
          streetName: submittedData.streetName,
          houseNumber: submittedData.houseNumber,
          numberAddition: submittedData.numberAddition,
          zip: submittedData.zip,
          city: submittedData.city,
          price: submittedData.price,
          constructionYear: submittedData.constructionYear,
          size: submittedData.size,
          hasGarage: submittedData.hasGarage,
          bedrooms: submittedData.bedrooms,
          bathrooms: submittedData.bathrooms,
          description: submittedData.description
        })
        console.log(houseResponse)
        if (submittedData.image) {
          const formDataImage = new FormData()
          formDataImage.append('image', submittedData.image)

          const img = await uploadImageHouse(props.houseData.id, formDataImage)
          console.log(img)
        }
      } catch (error) {
        console.error('Error submitting form:', error)
      } finally {
        goToHouseInfo(props.houseData.id)
      }
    } else {
      try {
        const houseResponse = await createHouse({
          streetName: submittedData.streetName,
          houseNumber: submittedData.houseNumber,
          numberAddition: submittedData.numberAddition,
          zip: submittedData.zip,
          city: submittedData.city,
          price: submittedData.price,
          constructionYear: submittedData.constructionYear,
          size: submittedData.size,
          hasGarage: submittedData.hasGarage,
          bedrooms: submittedData.bedrooms,
          bathrooms: submittedData.bathrooms,
          description: submittedData.description
        })
        const houseId = houseResponse.id
        console.log(houseId)

        if (submittedData.image) {
          const formDataImage = new FormData()
          formDataImage.append('image', submittedData.image)

          const img = await uploadImageHouse(houseId, formDataImage)
          console.log(img)
        }

        resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  }
}

const buttonText = computed(() => (props.isEdit ? 'Save' : 'Post'))
const labelStreet = computed(() => (props.isEdit ? 'Title of listing*' : 'Street name*'))
</script>

<template>
  <form @submit.prevent="submitForm">
    <BaseInput
      type="text"
      v-model="formData.streetName"
      placeholder="Enter the street name"
      :label="labelStreet"
      @blur="v$.streetName.$touch"
      :error="v$.streetName.$error"
    />
    <span class="error" v-if="v$.streetName.$error">Required field missing.</span>
    <div class="input-overlay">
      <div class="error-display">
        <BaseInput
          type="number"
          v-model="formData.houseNumber"
          placeholder="Enter house number"
          :label="`House number*`"
          @blur="v$.houseNumber.$touch"
          :error="v$.houseNumber.$error"
        />
        <span class="error" v-if="v$.houseNumber.$error">Required field missing.</span>
      </div>
      <div class="error-display">
        <BaseInput
          type="text"
          v-model="formData.numberAddition"
          placeholder="e.g. A"
          :label="`Additional (optional)`"
        />
        <!-- <span class="error" v-if="v$.numberAddition.$error">Required field missing.</span> -->
      </div>
    </div>
    <BaseInput
      type="text"
      v-model="formData.zip"
      placeholder="e.g. 1000 AA"
      :label="`Postal code*`"
      @blur="v$.zip.$touch"
      :error="v$.zip.$error"
    />
    <span class="error" v-if="v$.zip.$error">Required field missing.</span>
    <BaseInput
      type="text"
      v-model="formData.city"
      placeholder="e.g. Utrecht"
      :label="`City*`"
      @blur="v$.city.$touch"
      :error="v$.city.$error"
    />
    <span class="error" v-if="v$.city.$error">Required field missing.</span>
    <ImageInput v-model="formData.image" :edit="isEdit" />
    <BaseInput
      type="number"
      v-model="formData.price"
      placeholder="e.g. &#8364;150.000"
      :label="`Price*`"
      @blur="v$.price.$touch"
      :error="v$.price.$error"
    />
    <span class="error" v-if="v$.price.$error">Required field missing.</span>
    <div class="input-overlay">
      <div class="error-display">
        <BaseInput
          type="number"
          v-model="formData.size"
          placeholder="e.g. 60m&sup2;"
          :label="`Size*`"
          @blur="v$.size.$touch"
          :error="v$.size.$error"
        />
        <span class="error" v-if="v$.size.$error">Required field missing.</span>
      </div>
      <div class="error-display">
        <div class="select">
          <span class="custom-label">Garage*</span>
          <select
            v-model="formData.hasGarage"
            @blur="v$.hasGarage.$touch"
            :class="{ 'input-error': v$.hasGarage.$error }"
            required
          >
            <option disabled value="" selected hidden>Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <span class="error" v-if="v$.hasGarage.$error">Required field missing.</span>
        </div>
      </div>
    </div>
    <div class="input-overlay">
      <div class="error-display">
        <BaseInput
          type="number"
          v-model="formData.bedrooms"
          placeholder="Enter amount"
          :label="`Bedrooms*`"
          @blur="v$.bedrooms.$touch"
          :error="v$.bedrooms.$error"
        />
        <span class="error" v-if="v$.bedrooms.$error">Required field missing.</span>
      </div>
      <div class="error-display">
        <BaseInput
          type="number"
          v-model="formData.bathrooms"
          placeholder="Enter amount"
          :label="`Bathrooms*`"
          @blur="v$.bathrooms.$touch"
          :error="v$.bathrooms.$error"
        />
        <span class="error" v-if="v$.bathrooms.$error">Required field missing.</span>
      </div>
    </div>
    <BaseInput
      type="number"
      v-model="formData.constructionYear"
      placeholder="e.g. 1990"
      :label="`Construction date*`"
      @blur="v$.constructionYear.$touch"
      :error="v$.constructionYear.$error"
    />
    <span class="error" v-if="v$.constructionYear.$error">Required field missing.</span>
    <div>
      <span class="custom-label">Description*</span>
      <textarea
        v-model="formData.description"
        placeholder="Enter descrintion"
        @blur="v$.description.$touch"
        :class="{ 'input-error': v$.description.$error }"
      ></textarea>
      <span class="error" v-if="v$.description.$error">Required field missing.</span>
    </div>
    <ButtonComponent
      :disabled="v$.$invalid"
      :buttonType="`submit`"
      :text="buttonText"
      :bgColor="`var(--element-primary)`"
      class="submit-btn"
    />
  </form>
</template>
<style scoped>
@import './../assets/styles/main.css';

form {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    width: 400px;
  }
}
.select {
  width: 100%;
}
select {
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
select:invalid {
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: var(--element-tertiary-dark);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

textarea {
  padding: 10px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 150px;
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

.input-overlay {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.custom-label {
  display: block;
  color: var(--text-secondary);
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
}

.submit-btn {
  @media screen and (min-width: 768px) {
    width: 200px;
    align-self: flex-end;
  }
}

.error {
  display: block;
  color: var(--element-primary);
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-style: italic;

  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
}

.input-error {
  border: 1px solid var(--element-primary);
}

.error-display {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
