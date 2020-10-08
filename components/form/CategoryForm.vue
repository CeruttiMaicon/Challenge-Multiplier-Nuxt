<template>
  <div>
    <div class="text-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </div>
    <b-form v-else @submit="onSubmit" >
      <card-form :title="title" @clear="clear" route-back="/category" footer>
        <input-custom
          :state-error="typeof errorMessage.name != 'object' ? null : false"
          :message-error="errorMessage.name != '' ? String(errorMessage.name) : String(errorMessage.name)"
          v-model="form.name"
          :initial-value="form.name"
          name="name"
          label="Nome da Categoria"
          placeholder="Categoria"
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
      error_message:[]
    }
  },
  mounted(){
    if(this.edit)
    {
      this.getCategory()
    } else {
      this.loading = false
    }
  },
  methods:{
    onSubmit(e){
      this.$emit("change", this.form);
      e.preventDefault();
    },
    getCategory(){
      this.$axios
        .$get(
          `category/`+this.form.id
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            this.form = data
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
        name: ""
      }
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>
