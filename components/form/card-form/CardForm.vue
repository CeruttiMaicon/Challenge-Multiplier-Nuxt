<template>
  <div>
    <h1>{{title}}</h1>
    <b-card>
      <slot></slot>
      <template v-slot:footer>
        <b-button v-if="footer" variant="success" type="submit">Salvar</b-button>
        <b-button v-if="footer" @click="clear()" variant="primary">Limpar</b-button>
        <b-button :to="routeBack">Voltar</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      required: true
    },
    routeBack: {
      type: String
    },
    footer: {
      default: false,
      type: Boolean
    }
  },
  methods:{
    clear(){
      this.$emit("clear", true)
    }
  }
}
</script>
