<template>
  <b-card>
    <slot></slot>
    <table-custom :fields="fields" :items="data" title="Produtos Selecionados" customAction>
      <template v-slot:action="slotProps">
        <b-button variant="danger" @click="destroy(slotProps.index)"><b-icon-trash-fill /> Excluir</b-button>
      </template>
      <template v-slot:footer>
        <slot name="footer"></slot>
      </template>
    </table-custom>
  </b-card>
</template>

<script>
export default {
  props:{
    data:{
      type: Array,
      required:true
    }
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'name', label: 'Nome Produto' },
        { key: 'quantity', label: 'Quantidade' },
        { key: 'value', label: 'Preço' },
        { key: 'sub_total', label: 'Subtotal' }
      ],
    }
  },
  methods:{
    destroy(id){
      this.$emit('remove', id)
    }
  }
}
</script>
