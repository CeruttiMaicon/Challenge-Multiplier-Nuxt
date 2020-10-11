<template>
  <b-form-group
    :id="`input-group-${name}`"
    :label="label"
    :description="description"
  >
    <multiselect :allow-empty="false" :close-on-select="true" :show-labels="false" label="title"  :placeholder="placeholder" @input="handleInput" v-model="initialValue" :options="options"></multiselect>
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
      isTouched: false,
      isDisabled: false,
    }
  },
  async mounted() {
    await this.setInitialValue()
  },
  computed: {
    isInvalid () {
      return this.isTouched && this.value.length === 0
    }
  },
  methods: {
    setInitialValue(){
      this.$nextTick(() => {
        this.initialValue = this.options.filter(data => {
          return data.value == this.value
        })
      })
    },
    handleInput(e)
    {
      this.$emit("input", e.value);
    },
    onTouch () {
      this.isTouched = true
    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
