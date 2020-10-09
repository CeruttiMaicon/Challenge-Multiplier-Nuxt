<template>
  <div>
    <div class="text-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </div>
    <b-form v-else @submit="onSubmit" >
      <card-order>
        <b-row v-if="rebuild">
          <b-col cols="7">
            <select-custom
              :state-error="error_message.product == '' ? null : false"
              :message-error="error_message.product"
              v-model="add_product"
              :initial-value="add_product"
              placeholder="Selecione um produto"
              name="product"
              :options="products"
            />
          </b-col>
          <b-col cols="5">
            <input-custom
              :state-error="error_message.quantity_validation"
              :message-error="error_message.quantity"
              v-model="add_quantity"
              :initial-value="add_quantity"
              name="quantity"
              type="number"
              placeholder="0"
            />
          </b-col>
        </b-row>
        <div v-else class="text-center">
          <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
        <template v-slot:footer>
          <b-button @click="add()" variant="success"><b-icon-cart-plus /> Adicionar Produto</b-button>
        </template>
      </card-order>
      <card-order-products-selected :data="products_selected">

      </card-order-products-selected>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    errorMessage: {
      type: Object | Array
    }
  },
  data() {
    return {
      form: {
        id:this.$route.params.edit || null,
        product:""
      },
      products: [],
      rebuild: true,
      products_selected: [],
      add_product:"",
      add_quantity:"",
      loading:true,
      message:"",
      error_message:[],
      categories:[],
      add_product_api:[],
    }
  },
  mounted(){
    this.loading = false
    this.getProducts()
  },
  methods:{
    onSubmit(e){
      this.$emit("change", this.form);
      e.preventDefault();
    },
    getProducts(){
      this.$axios
        .$get(
          "product"
        )
        .then(({data}) => {
          this.products = data.map(({id, name, category_name, value}) => {
            return {value:id, title:name }
          });
        })
    },
    setProduct(id){
      return this.$axios
        .$get(
          `product/`+id
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            this.add_product_api = {
              id:data.id, name:data.name,
              quantity:this.add_quantity,
              sub_total:
                (this.add_quantity*data.value).toLocaleString(
                  'en-US', {
                  style: 'currency',
                  currency: 'BRL',
                })}
          } else {
            this.message = message
            this.error_message = error_message
          }
        })
    },
    clear(e){
      this.loading = true
      this.form = {
        ...this.form,
        name: "",
        value: 0,
      }
      this.$nextTick(() => {
        this.loading = false
      })
    },
    rebuilder()
    {
      this.rebuild = false
      this.$nextTick(() => {
        this.rebuild = true
      })
    },
    async add(){
      let error_flag = false

      if(this.add_product == "")
      {
        error_flag = true
        this.error_message.product = "Informe um produto"
      } else
      {
        this.error_message.product = ""
      }

      if(this.add_quantity == "")
      {
        error_flag = true
        this.error_message.quantity = "Informe a quantidade"
        this.error_message.quantity_validation = false
      } else
      {
        this.error_message.quantity = ""
        this.error_message.quantity_validation = null
      }

      if(!error_flag)
      {
        await this.setProduct(this.add_product)

        await this.products_selected.push(this.add_product_api)

        this.add_product = ""
        this.add_quantity = ""
      }
      this.rebuilder()
    },
  }
}
</script>
