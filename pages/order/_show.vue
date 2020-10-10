<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <div class="text-center" v-if="loading">
          <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
        <card-form title="Visualizar Pedido" route-back="/order">
          <b-row>
            <b-col>
              Código: {{item.id}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Pedido do Usuário: {{item.user_name}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Total Pedido: R$ {{item.total}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Quantidades Totais: {{item.quantity_total}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Pedido criado em: {{moment(item.created_at)}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Pedido atualizado em: {{moment(item.updated_at)}}
            </b-col>
          </b-row>
          <div>
            <h2>Produtos Pedido</h2>
            <b-table responsive :fields="fields" striped hover :items="item.products"></b-table>
          </div>
        </card-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'

export default {
  mounted() {
    this.getCategory()
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Nome Produto'
        },
        {
          key: 'category.name',
          label: 'Categoria'
        },
        {
          key: 'pivot.quantity',
          label: 'Quantidade',
          class:"text-center"

        },
        {
          key: 'pivot.value',
          label: 'Preço',
          class:"text-center"
        },
        {
          key: 'pivot.sub_total',
          label: 'Sub total',
          class:"text-center"
        }
      ],
      id: this.$route.params.show,
      item: [],
      loading: true,
      message: "",
      error_message: ""
    }
  },
  methods:{
    getCategory(){
      this.$axios
        .$get(
          `order/`+this.id
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            this.item = data
          } else {
            this.message = message
            this.error_message = error_message
          }
        }).finally(() =>{
          this.loading = false
        })
    },
    moment(date){
      return moment(date).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>
