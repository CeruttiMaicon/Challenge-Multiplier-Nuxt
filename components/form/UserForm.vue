<template>
  <div>
    <div class="text-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </div>
    <b-form v-else @submit="onSubmit" >
      <card-form :title="title" @clear="clear" route-back="/user" footer>
        <input-custom
          :state-error="typeof errorMessage.name != 'object' ? null : false"
          :message-error="errorMessage.name != '' ? String(errorMessage.name) : String(errorMessage.name)"
          v-model="form.name"
          :initial-value="form.name"
          name="name"
          label="Nome do Usuário:"
          placeholder="Usuário"
        />
        <input-custom
          :state-error="typeof errorMessage.email != 'object' ? null : false"
          :message-error="errorMessage.email != '' ? String(errorMessage.email) : String(errorMessage.email)"
          v-model="form.email"
          :initial-value="form.email"
          name="email"
          label="E-mail:"
          type="email"
          placeholder="E-mail"
        />
        <input-custom
          :state-error="typeof errorMessage.password != 'object' ? null : false"
          :message-error="errorMessage.password != '' ? String(errorMessage.password) : String(errorMessage.password)"
          v-model="form.password"
          :initial-value="form.password"
          name="password"
          label="Senha:"
          type="password"
          placeholder="Senha"
        />
        <input-custom
          :state-error="typeof errorMessage.password_confirmation != 'object' ? null : false"
          :message-error="errorMessage.password_confirmation != '' ? String(errorMessage.password_confirmation) : String(errorMessage.password_confirmation)"
          v-model="form.password_confirmation"
          :initial-value="form.password_confirmation"
          name="password_confirmation"
          label="Confirmação de Senha:"
          type="password"
          placeholder="Confirmar Senha"
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
      this.getUser()
    } else {
      this.loading = false
    }
  },
  methods:{
    onSubmit(e){
      this.$emit("change", this.form);
      e.preventDefault();
    },
    getUser(){
      this.$axios
        .$get(
          `user/`+this.form.id
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
        name: "",
        email:"",
        password:"",
        password_confirmation:""
      }
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>
