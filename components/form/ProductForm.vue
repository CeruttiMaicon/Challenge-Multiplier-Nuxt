<template>
  <div>
    <div class="text-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </div>
    <b-form v-else @submit="onSubmit" >
      <card-form :title="title" @clear="clear" route-back="/product" footer>
        <input-custom
          :state-error="typeof errorMessage.name != 'object' ? null : false"
          :message-error="errorMessage.name != '' ? String(errorMessage.name) : String(errorMessage.name)"
          v-model="form.name"
          :initial-value="form.name"
          name="name"
          label="Nome do Produto"
          placeholder="Produto"
        />
        <money
          :state-error="typeof errorMessage.value != 'object' ? null : false"
          :message-error="errorMessage.value != '' ? String(errorMessage.value) : String(errorMessage.value)"
          v-model="form.value"
          :initial-value="form.value"
          name="name"
          label="Preço"
          placeholder="0.00"
        />
        <select-custom
          :state-error="typeof errorMessage.category_id != 'object' ? null : false"
          :message-error="errorMessage.category_id != '' ? String(errorMessage.category_id) : String(errorMessage.category_id)"
          v-model="form.category_id"
          :initial-value="form.category_id"
          placeholder="Selecione uma Categoria"
          name="category_id"
          label="Categoria"
          :options="categories"
        />
      </card-form>
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
        name:""
      },
      loading:true,
      message:"",
      error_message:[],
      categories:[]
    }
  },
  mounted(){
    this.getCategories()
    if(this.edit)
    {
      this.getProduct()
    } else {
      this.loading = false
    }
  },
  methods:{
    onSubmit(e){
      this.$emit("change", this.form);
      e.preventDefault();
    },
    getProduct(){
      this.$axios
        .$get(
          `product/`+this.form.id
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            this.form = data
            this.form.value = Number(data.value)
          } else {
            this.message = message
            this.error_message = error_message
          }
        })
        .finally(() =>{
          this.loading = false
        })
    },
    clear(e){
      this.loading = true
      this.form = {
        ...this.form,
        name: "",
        value: 0,
        category_id: 0
      }
      this.$nextTick(() => {
        this.loading = false
      })
    },
    getCategories(){
      this.$axios
        .$get(
          "category"
        )
        .then(({data}) => {
          this.categories = data.map(({id, name}) => {
            return {value:id, title:name }
          });
        })
    }
  }
}
</script>
