<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom buttom-add show edit remove :fields="fields" :items="items" title="Produtos" route="product" route-add="/product/add">
          <template v-slot:header>
            <b-icon-box-seam font-scale="4" ></b-icon-box-seam>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  mounted() {
    this.getProducts()
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'name', label: 'Nome Produto' },
        { key: 'category', label: 'Categoria' },
        { key: 'value', label: 'Preço' }
      ],
      items: [],
    }
  },
  methods:{
    getProducts(){
      this.$axios
        .$get(
          "product"
        )
        .then(({data}) => {
          this.items = data.map(({id, name, category_name, value}) => {
            return {codigo:id, name:name, category:category_name, value:`R$ ${value}` }
          });
        })
    }
  }
}
</script>
