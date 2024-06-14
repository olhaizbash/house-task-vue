<script setup>
import ButtonComponent from './ButtonComponent.vue'
import BaseInput from './BaseInput.vue'
import ImageInput from './ImageInput.vue'
import { ref } from 'vue'

const streetName = ref('')
const houseNumber = ref('')
const numberAddition = ref('')
const zip = ref('')
const city = ref('')
const image = ref('')
const price = ref('')
const constructionYear = ref('')
const size = ref('')
const hasGarage = ref('')
const bedrooms = ref('')
const bathrooms = ref('')
const description = ref('')
</script>
<template>
  <form>
    <BaseInput
      type="text"
      v-model="streetName"
      placeholder="Enter the street name"
      :label="`Street name*`"
      required
    />
    <div class="input-overlay">
      <BaseInput
        type="number"
        v-model="houseNumber"
        placeholder="Enter house number"
        :label="`House number*`"
        required
      />
      <BaseInput
        type="text"
        v-model="numberAddition"
        placeholder="e.g. A"
        :label="`Additional (optional)*`"
        required
      />
    </div>
    <BaseInput
      type="text"
      v-model="zip"
      placeholder="e.g. 1000 AA"
      :label="`Postal code*`"
      required
    />
    <BaseInput type="text" v-model="city" placeholder="e.g. Utrecht" :label="`City*`" required />
    <!-- <BaseInput
      type="file"
      v-model="image"
      :label="`Upload picture (PNG or JPG)*`"
      accept="image/png, image/jpeg"
    /> -->

    <ImageInput v-model="image" />

    <BaseInput
      type="number"
      v-model="price"
      placeholder="e.g. &#8364;150.000"
      :label="`Price*`"
      required
    />
    <div class="input-overlay">
      <BaseInput
        type="number"
        v-model="size"
        placeholder="e.g. 60m&sup2;"
        :label="`Size*`"
        required
      />
      <div class="select">
        <span>Garage*</span>
        <select v-model="hasGarage">
          <option disabled value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </div>
    <div class="input-overlay">
      <BaseInput
        type="number"
        v-model="bedrooms"
        placeholder="Enter amount"
        :label="`Bedrooms*`"
        required
      />
      <BaseInput
        type="number"
        v-model="bathrooms"
        placeholder="Enter amount"
        :label="`Bathrooms*`"
        required
      />
    </div>
    <BaseInput
      type="number"
      v-model="constructionYear"
      placeholder="e.g. 1990"
      :label="`Construction date*`"
      required
    />
    <div>
      <span>Description*</span>
      <textarea v-model="description" placeholder="Enter descrintion" required></textarea>
    </div>
    <ButtonComponent
      :buttonType="`submit`"
      :text="`Post`"
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

span {
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
</style>
