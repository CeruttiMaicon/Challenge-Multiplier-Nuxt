<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <product-form @change="submit" title="Adicionar Produto" :error-message="error_message"></product-form>
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
          'product', form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Registrado!',
              message,
              'success'
            ).then(() => {
                this.$router.push('/product')
            })
          }
        }).catch((error) => {
            this.error_message = error.response.data.error_message;
            Swal.fire(
              'Erro!',
              error.response.data.message,
              'error'
            )
        })
    }
  },
}
</script>
