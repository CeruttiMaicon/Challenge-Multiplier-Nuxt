<template>
  <div>
    <b-form v-if="rebuild" @submit="onSubmit" >
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
        name:"",
      },
      rebuild: true,
      message:"",
      error_message:[]
    }
  },
  async mounted(){
    if(this.edit)
    {
      await this.getCategory()
    }
  },
  methods:{
    onSubmit(e){
      this.$nuxt.$loading.start()
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
          this.$nuxt.$loading.finish()
          this.rebuilder()
        })
    },
    clear(e){
      this.form = {
        ...this.form,
        name: ""
      }
      this.rebuilder()
    },
    rebuilder()
    {
      this.rebuild = false
      this.$nextTick(() => {
        this.rebuild = true
      })
    },
  }
}
</script>
