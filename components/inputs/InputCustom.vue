<template>
  <b-form-group
    :id="`input-group-${name}`"
    :label="label"
    :description="description"
  >
    <b-form-input :state="stateError" :name="name" :id="`input-${name}`" @input="handleInput" :required="required" :type="type" :value="initialValue" :placeholder="placeholder"></b-form-input>
    <b-form-invalid-feedback :state="stateError">
      {{ messageError}}
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props:{
    value: {
      type: String,
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
  },
  data() {
    return {
      size: "",
      initialValue: this.value
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
