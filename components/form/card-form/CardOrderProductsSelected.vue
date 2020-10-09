<template>
  <b-card>
    <slot></slot>
    <table-custom :fields="fields" :items="data" title="Produtos">
      <template v-slot:action>
        <b-button variant="danger">Excluir</b-button>
      </template>
    </table-custom>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
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
        { key: 'sub_total', label: 'Sub total' }
      ],
    }
  },
}
</script>
