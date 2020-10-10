<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <product-form edit title="Editar Produto" @change="submit" :error-message="error_message"></product-form>
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
        .$patch(
          `product/${form.id}`, form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Atualizado!',
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
        }).finally(()=>{
          this.$nuxt.$loading.finish()
        })
    }
  },
}
</script>
