<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <loader v-if="loading" />
        <order-form @change="submit" title="Adicionar Pedido" :error-message="error_message"></order-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      error_message:"",
      loading:false
    }
  },
  methods: {
    submit(form){
      this.$axios
        .$post(
          'order', form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Registrado!',
              message,
              'success'
            ).then(() => {
                this.$router.push('/order')
            })
          }
        }).catch((error) => {
            this.error_message = error.response.data.error_message;
            console.error(this.error_message)
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
