<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <user-form @change="submit" title="Adicionar Usuário" :error-message="error_message"></user-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      error_message:""
    }
  },
  methods: {
    submit(form){
      this.$axios
        .$post(
          'user', form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Registrado!',
              message,
              'success'
            ).then(() => {
                this.$router.push('/user')
            })
          }
        }).catch((error) => {
            this.error_message = error.response.data.error_message;
            Swal.fire(
              'Erro!',
              error.response.data.message,
              'error'
            )
        }).finally(()=>{
          this.$nuxt.$loading.finish()
        })
    }
  },
}
</script>
