<template>
  <b-form-group
    :id="`input-group-${name}`"
    :label="label"
    :description="description"
  >
    <multiselect @input="handleInput" label="title" v-model="initialValue" :options="options"></multiselect>

    <b-form-invalid-feedback :state="stateError">
      {{ messageError}}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vue from 'vue'

Vue.component('multiselect', Multiselect)

export default {
  components: { Multiselect },
  props:{
    value: {
      type: String | Number,
      default: ""
    },
    label:{
      type: String,
      required: true
    },
    description: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: String,
    },
    stateError: {
      type: Boolean,
      default: null
    },
    messageError: {
      type: String
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      size: "",
      initialValue: "",
    }
  },
  async beforeUpdate() {
    await this.setInitialValue()
  },
  methods: {
    setInitialValue(){
      this.initialValue = this.options.filter(data => {
        return data.value == this.value
      })
    },
    handleInput(e)
    {
      this.$emit("input", e.value);
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
