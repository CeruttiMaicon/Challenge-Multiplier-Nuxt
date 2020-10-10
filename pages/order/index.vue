<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom buttom-add show remove :fields="fields" :items="items" title="Pedidos" route="order" route-add="/order/add">
          <template v-slot:header>
            <b-icon-clipboard-check font-scale="4" ></b-icon-clipboard-check>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import moment from 'moment'

export default {
  mounted() {
    this.getOrders()
  },
  data() {
    return {
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'date_of_sale', label: 'Data da Venda' },
        { key: 'value', label: 'Preço' }
      ],
      items: [],
    }
  },
  methods:{
    getOrders(){
      this.$axios
        .$get(
          "order"
        )
        .then(({data, success}) => {
          this.items = data.map(({id, updated_at, total}) => {
            const date_of_sale = moment(updated_at).format('DD/MM/YYYY HH:mm:ss');
            return {codigo:id, date_of_sale, value:total }
          });
        })
    }
  }
}
</script>
