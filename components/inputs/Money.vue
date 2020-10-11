<template>
  <b-form-group
    :id="`input-group-${name}`"
    :label="label"
    :description="description"
  >
    <money class="form-control" v-model="initialValue" v-bind="money" :state="stateError" :name="name" :id="`input-${name}`" @input="handleInput" :required="required" :type="type" :placeholder="placeholder"></money>
    <b-form-invalid-feedback :state="stateError">
      {{ messageError}}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import {Money} from 'v-money'
export default {
  components: {Money},
  props:{
    value: {
      type: Number | String,
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
  },
  data() {
    return {
      size: "",
      initialValue: this.value,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  methods: {
    handleInput(e)
    {
      this.$emit("input", e);
    },
  },
}
</script>
