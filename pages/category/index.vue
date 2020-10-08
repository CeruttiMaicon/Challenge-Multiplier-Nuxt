<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom :fields="fields" :items="items" title="Categorias" route="category" route-add="/category/add">
          <template v-slot:header>
            <b-icon-tags font-scale="4" ></b-icon-tags>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  mounted() {
    this.getCategories()
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'name', label: 'Nome' }
      ],
      items: [],
    }
  },
  methods:{
    getCategories(){
      this.$axios
        .$get(
          "category"
        )
        .then(({data}) => {
          this.items = data.map(({id, name}) => {
            return {codigo:id, name:name }
          });
        })
    }
  }
}
</script>
